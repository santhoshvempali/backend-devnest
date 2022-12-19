const express=require("express")
const app=express()
const PORT=3003
const user=require("./routes/user")
const productRoute=require("./routes/product")


const {connectDB}=require("./config/db")

connectDB()


app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(express.static("public"))


app.use("/api/v1/user/",user)
app.use("/api/v1/product",productRoute)

try {
    app.listen(PORT,(err,data)=>{
        console.log(`app running on ${PORT}`)
    })
} catch (error) {
    console.log(error)
}