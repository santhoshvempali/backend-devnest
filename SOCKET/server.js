const exp = require("constants");
const express = require("express");
const http = require("http");
const { Server } = require("socket.io");
const app = express();
const server = http.createServer(app);
const io = new Server(server);
app.use(express.static("public"));

const usernames = {};
const rooms = [
  { name: "globalChat", creator: "anonymous" },
  { name: "chess", creator: "anonymous" },
  { name: "javascript", creator: "anonymous" },
];

io.on("connection",function(socket){
    socket.on("createUser",function(name){
        socket.usernames=name
        console.log(socket)
        usernames.username=name
        socket.currentRoom="globalChat"

        socket.join("globalChat")
        socket.emit("updatechat","INFO","You have joined globalChat")
    })


    socket.on("sendMessage",function(message){
        io.sockets.to(socket.currentRoom).emit("updatechat",socket.usernames,message)
    })
})




server.listen(4000, () => {
  console.log("server running at port 4000");
});
