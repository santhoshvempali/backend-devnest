const mongoose=require("mongoose")
require("dotenv").config()
const DB_URI=process.env.MONGO_URL
const MONGO_OPTIONS={
    useNewUrlParser: true,
    useUnifiedTopology:true
}

const connectDB=async()=>{
    try {
        await mongoose.connect(DB_URI,MONGO_OPTIONS);
        console.log("MongoDb connected")
    } catch (error) {
        console.log(`Mongo not connected ***${error}`)
        process.exit()
    }
}

module.exports=connectDB;