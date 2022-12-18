const express=require("express")
const routes=express.Router()
const main=require("../scrape/scrape")
const path=require("path")



routes.post('/indeed',async(req,res)=>{
    try {
        const {skill}=req.body
        console.log(skill)
        let scrape=await main(skill);
        console.log(scrape)
        return res.status(200).json({
            status:"0k",
            list:scrape && typeof(scrape)==='object' && scrape.list? scrape.list :{}
        })
    } catch (error) {
        res.status(500).send(error)
    }
})
routes.get('/getData',async(req,res)=>{
    try {
      const jobs =path.join(__dirname,'..','jobs.json')
      res.sendFile(jobs);
    } catch (error) {
      
    }
  })

module.exports=routes