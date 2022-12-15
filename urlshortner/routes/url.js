const express=require("express")
const router=express.Router()
const { v4: uuidv4 } = require('uuid');
const createDB=require("../config/db")
const URL=require("../models/urlModel")
const baseUrl='http://localhost:3000/urlapi'

createDB.sync().then(()=>{
    console.log("db running")
})

router.post("/", async(req,res)=>{
    try {
        const {longUrl}=req.body
        const shortid=uuidv4(4)
        const shortUrl=await URL.create({
            longUrl:longUrl,
            shortUrl: shortid
        });
        return res.status(200).json({
            status:"ok",
            shortUrl:`${baseUrl}/${shortid}`
        })
    } 
    catch (error) {
        return res.status(500).send(error)
    }
})

router.get('/:short', async (req, res) => {
    let shortId=req.params.short
    //find a values using where
    let url = await URL.findOne({
      where: {
        shortUrl: shortId
      }
    });
    console.log(url)
    if(!url){
      res.status(404).send("Enter valid code")
    }
    res.redirect(url.longUrl)
  }
)





module.exports=router