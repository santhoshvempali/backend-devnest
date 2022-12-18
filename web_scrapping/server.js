const express=require("express")
const app=express()
const getRoutes=require("./routes/getRoute")
const PORT=3002
const ngrok=require("ngrok")



app.use(express.json())
app.use(express.static("public"))
app.use(express.urlencoded({extended:false}))

app.use("/",getRoutes)



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