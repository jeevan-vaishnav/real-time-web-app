const path = require("node:path");
const http = require("node:http");
const express = require("express");
const socketio = require('socket.io')

const app = express();
const server = http.createServer(app);
const io = socketio(server)

const port = process.env.PORT || 3000;

const publicDirectoryPath = path.join(__dirname, "../public");

app.use(express.static(publicDirectoryPath));

io.on('connection',()=>{
    console.log('New websocket IO')
})

server.listen(port, () => {
  console.log(`Server is up on port ${port}`);
});
