const path = require("node:path");
const http = require("node:http");
const express = require("express");
const socketio = require("socket.io");
const Filter = require("bad-words");
const {
  generateMessage,
  generateLocationMessage,
} = require("./utils/messages");

const {
  addUser,
  getUserById,
  getRoomUser,
  removeUser,
} = require("./utils/users");
const app = express();
const server = http.createServer(app);
const io = socketio(server);

const port = process.env.PORT || 3000;

const publicDirectoryPath = path.join(__dirname, "../public");

app.use(express.static(publicDirectoryPath));


io.on("connection", (socket) => {
  console.log("New websocket connection");

  socket.on("join", (options, callback) => {
    const { error, user } = addUser({ id: socket.id, ...options });

    console.log(error, user);

    if (error) {
      return callback(error);
    }

    socket.join(user.room);

    socket.emit("message", generateMessage("Welcome"));
    socket.broadcast
      .to(user.room)
      .emit("message", generateMessage(`${user.username} has joined!`));

    callback();
  });

  socket.on("sendMessage", (msg, callback) => {

    const user = getUserById(socket.id);
    if (!user) {
      console.error("User not found for socket ID:", socket.id);
      return callback("User not found.");
    }
    
    if (!user.room) {
      console.error("Room not found for user:", user);
      return callback("User is not assigned to any room.");
    }
    
    const filter = new Filter();
    if (filter.isProfane(msg)) {
      return callback("Profanity is not allowed!");
    }

    io.to(user.room).emit("message", generateMessage(msg));
    callback();

  });

  socket.on("sendLocation", (coords, callback) => {
    const user = getUserById(socket.id);

    io.to(user?.room).emit(
      "locationMessage",
      generateLocationMessage(
        `https://google.com/maps?q=${coords.latitude},${coords.longitude}`
      )
    );
    callback();
  });

  socket.on("disconnect", () => {
    const user = removeUser(socket.id);
    if (user) {
      io.to(user.room).emit(
        "message",
        generateMessage(`${user.username} user has left!`)
      );
    }
  });
});

server.listen(port, () => {
  console.log(`Server is up on port ${port}`);
});
