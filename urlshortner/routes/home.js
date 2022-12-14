const express=require("express")
const router=express.Router()
const path=require("path")

router.get("/", async (req,res)=>{
      const htmlpath=path.join(__dirname,"public","index.html")
      res.sendFile(htmlpath)
})

module.exports=router