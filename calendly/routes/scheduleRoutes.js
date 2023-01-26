const express=require("express")

const router=express.Router()

const isAuthenticated=require("../middlewares/auth")
const schedule=require("../models/scheduleModel")
const event=require("../models/userModel")
const User=require("../models/userModel")

router.post("/create",isAuthenticated,async(req,res)=>{
    try {
        const{day,dayStart,dayEnd,eventDuration}=req.body;
        const user=req.user.id
        const foundUser=User.findById(user)
        if(!foundUser){
            return res.status(404).json({err:"User Not Found"})
        }
        const presentSchedule=await schedule.findOne({user,day})
        if(presentSchedule){
            return res.status(403).json({err:"Schedule already exists"})
        }
        const newSchedule=new schedule({
            user,
            day,
            dayStart,
            dayEnd,
            eventDuration
        });
        await newSchedule.save()
        foundUser.schedules.push(newSchedule)
        await foundUser.save()
        return res.status(200).json(newSchedule)
    } catch (error) {
        return res.status(500).json({error:error})
        
    }
})

router.get("/get/:userId",async(req,res)=>{
    try {
        const foundUser=await User.findById(req.params.userId);
        if(!foundUser){
           return res.status(404).json({err:"user not found"}) 
        }
        const schedule=await schedule.find({user:req.params.userId})
        return res.status(200).json(schedule)
    } catch (error) {
        return res.status(404).json({err:error})
        
    }
})


module.exports=router