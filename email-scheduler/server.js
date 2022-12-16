const express=require("express")
const app=express()
const scheduler=require("node-cron")
const PORT=3001

const {transporter,options}=require("./services/email")


scheduler.schedule("* * * * * *",()=>{
    transporter.sendMail(options,(err,data)=>{
        if(err){
            console.log(err,"the error")
        }
        console.log("Email Sent")
    })
})


try {
    app.listen(PORT,(err,data)=>{
        console.log("server up and running")
    })
} catch (error) {
    console.log(error)
}