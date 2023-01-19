const express=require("express")
const app=express()
const {v4:uuidv4}=require("uuid")
require("dotenv").config()

const PORT=process.env.PORT
const server=require("http").createServer()
const io=require("socket.io")(server)
const {ExpressPeerServer}=require("peer")
const url=require("url")
const peerServer=ExpressPeerServer(server,{
    debug: true
});
const path=require("path")

app.set("view engine","ejs")
app.use("/public",express.static(path.join(__dirname,"static")))
app.use("/peerjs",peerServer)

app.get("/",(req,res)=>{
    res.sendFile(path.join(__dirname,"static","index.html"))
});
app.get("/join",(req,res)=>{
    res.redirect(
      url.format({
        pathname: `/join/${uuidv4()}`,
        query: req.query
      })  
    )
})

app.get("/joinold",(req,res)=>{
    res.redirect(
        url.format({
            pathname: req.params.meeting_id,
            query:req.query
        })
    )
})

app.get("/join/:rooms",(req,res)=>{
    res.render("room",{roomid: req.params.rooms,Myname: req.query.name})
})

io.on("connection",(socket)=>{
    socket.on("join-room",(roomid,id,myname)=>{
        socket.join(roomid);
        socket.to(roomid).broadcast.emit("user-connected",id,myname);
    
    socket.on("tellName",(myname)=>{
        socket.to(roomid).broadcast.emit("AddName",myname);
    })

    socket.on("disconnect",()=>{
        socket.to(roomid).broadcast.emit("user-disconnected",myname)
    })

    })

})

server.listen(PORT,(err,data)=>{
    if(err){
        console.log(`error at ${err}`)
    }
    console.log(`port running at localhost:${PORT}}`)
})