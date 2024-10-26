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


io.on('connection',(socket)=>{
    console.log('New websocket connection')

    socket.emit('message',"Welcome You")
    
    // socket.emit('countUpdated',count)

    // socket.on('increment',()=>{
    //     count++;
    //     // socket.emit('countUpdated',count)
    //     io.emit('countUpdate',count)
    // })
})

server.listen(port, () => {
  console.log(`Server is up on port ${port}`);
});
