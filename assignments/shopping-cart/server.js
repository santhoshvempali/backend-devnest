const express=require("express")
const app=express()
const path=require("path")
const productRoutes=require("./routes/productRoute")
const logger=require("./utils/customLogger").logger(__filename.slice(__dirname.length + 1))
require("dotenv").config()
const PORT=process.env.PORT
const {connectDB}=require("./config/db")

connectDB()


app.use(express.json())
app.use(express.urlencoded({extended:false}))

app.use("/api/v1/products",productRoutes)




app.listen(PORT,(err,data)=>{
    if(err){
        logger.info(`Problem in firing server at ${PORT}`)
    }
    logger.info("Server is up and running",PORT)
})