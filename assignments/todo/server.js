const express=require("express")
const app=express()
const PORT=1337
const todoRoute=require("./routes/todo")
const {connectDB}=require("./config/db")
const ngrok=require("ngrok")
connectDB()
app.use(express.json())
app.use(express.urlencoded({extended:true}))

app.use("/api/",todoRoute)

app.listen(PORT,(err,data)=>{
    console.log(`app running on ${PORT}`)
});


(async function(){
    const url = await ngrok.connect({
        proto:'http',
        addr:PORT,
        authtoken:'2ItcO1pxPHwKl81EJuLodWGgOVi_5sd5GCq3BQbR1a2jJuFr3'
    });
    console.log(url);
})();