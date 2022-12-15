const express=require("express")
const app=express()
const PORT=3000
const shortUrl=require("./routes/url")
const homeRoutes=require("./routes/home")

app.use(express.json())
app.use(express.static("public"))
app.use(express.urlencoded({extended:false}))

app.use("/urlapi",shortUrl)
app.use("/",homeRoutes)
try {
    app.listen(PORT,(data,error)=>{
        console.log("Connected running on ",PORT)
    })
} catch (error) {
    console.log(error)
}