const express=require("express")
const app=express()
const user=require("./routes/user")
const productRoute=require("./routes/product")
const swaggerUi=require("swagger-ui-express")
const swagger=require("swagger-jsdoc")
require("dotenv").config()
const PORT=process.env.PORT
const BASE_URL=process.env.BASE_URL

const options = {
    definition: {
      openapi: "3.0.0",
      info: {
        title: "Photo/Video Store API",
        version: "1.0.0",
        description:
          "Completed project with file upload, payment gateway, unit testing and swagger docs",
      },
      servers: [
        {
          url: BASE_URL,
          name: "photapp"
        },
      ],
    },
    apis: ["./routes/*.js"],
  };

  const specs=swagger(options)

const {connectDB}=require("./config/db")
const cors=require("cors")

connectDB()


app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(express.static("public"))

app.use("/docs",swaggerUi.serve,swaggerUi.setup(specs))
app.use("/api/v1/user/",user)
app.use("/api/v1/product",productRoute)

try {
    app.listen(PORT,(err,data)=>{
        console.log(`app running on ${PORT}`)
    })
} catch (error) {
    console.log(error)
}