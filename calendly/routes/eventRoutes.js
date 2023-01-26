const express=require("express")
const router=express.Router();
const eventModel=require("../models/eventModel")
const userModel=require("../models/userModel")
const scheduleModel=require("../models/scheduleModel")
const isAuthenticated=require("../middlewares/auth")
const {validateEmail}=require("../utils/validators")


router.post("/create",isAuthenticated,async(req,res)=>{
    try {
        const{menteeEmail,mentorID,schedule,title,description,day,start,end}=req.body
        if(!validateEmail(menteeEmail)){
            return res.status(400).json({err:"Invalid Email"})
        }
        const foundUser=await userModel.findById(mentorID)
        if(!foundUser){
            return res.status(500).json({err:err.message})
        }
        const foundSchedule=await scheduleModel.findById(schedule)
        if(!foundSchedule){
            return res.status(400).json("No Availability Set")
        }
        if(start<foundSchedule.dayStart || end>foundSchedule.dayEnd){
            return res.status(400).json({
                err:"Not in the availability Time"
            })
        }

        const foundClashingMenteeEvent=await eventModel.findOne({
            menteeEmail,
            day,
            start:{$lte:end},
            end:{$gte:start}
        })

        if(foundClashingMenteeEvent){
            return res.status(500).json({
              err:"clashing meetings "  
            })
        }

        const foundClashingMentorEvent=await eventModel.findOne({
            mentorID,
            day,
            start:{$lte:end},
            end:{$gte:start}
        })

        if(foundClashingMentorEvent){
            return res.status(500).json({
              err:"clashing meetings "  
            })
        }

        const newEvent=new eventModel({
            menteeEmail,
            mentorID,
            schedule,
            title,
            description,
            day,
            start,
            end
        })

        await newEvent.save()
        foundUser.events.push(newEvent);
        await foundUser.save()

        return res.status(201).json(newEvent)


    } catch (error) {
        return res.status(400).json({err:error})
    }
})

router.get("/get/:eventID", async (req, res) => {
    try {
      const foundEvent = await Event.findById(req.params.eventID);
      if (!foundEvent) {
        return res.status(404).json({ err: "Event not found" });
      }
  
      res.status(200).json(foundEvent);
    } catch (err) {
      console.log(err);
      return res.status(500).json({ err: err.message });
    }
  });
  
  // @route   GET api/v1/event/get/byschedule/:scheduleID
  // @desc    Get all the events for a given schedule
  // @access  Public
  
  router.get("/get/byschedule/:scheduleID", async (req, res) => {
    try {
      const foundEvents = await Event.find({ schedule: req.params.scheduleID });
      if (!foundEvents) {
        return res.status(404).json({ err: "No Events not found" });
      }
  
      res.status(200).json(foundEvents);
    } catch (err) {
      console.log(err);
      return res.status(500).json({ err: err.message });
    }
  });
  
  // @route   GET api/v1/event/get/:userID
  // @desc    Get all the events by a user
  // @access  Public
  
  router.get("/get/byuser/:userID", async (req, res) => {
    try {
      const foundEvents = await Event.findById({ mentorID: req.params.userID });
      if (!foundEvents) {
        return res.status(404).json({ err: "No events not found" });
      }
  
      res.status(200).json(foundEvents);
    } catch (err) {
      console.log(err);
      return res.status(500).json({ err: err.message });
    }
  });
  
  // @route   GET api/v1/event/delete/:eventID
  // @desc    Delete event by event ID
  // @access  Public
  
  router.get("/delete/:eventID", async (req, res) => {
    try {
      const foundEvent = await Event.findById(req.params.eventID);
      if (!foundEvent) {
        return res.status(404).json({ err: "Event not found" });
      }
  
      const foundUser = await User.findById(foundEvent.menteeEmail);
      if (!foundUser) {
        return res.status(404).json({ err: "User not found" });
      }
  
      const foundSchedule = await Schedule.findById(foundEvent.schedule);
  
      if (!foundSchedule) {
        return res.status(404).json({ err: "Schedule not found" });
      }
  
      await foundUser.events.pull(foundEvent);
      await foundUser.save();
      await foundSchedule.events.pull(foundEvent);
      await foundSchedule.save();
      await foundEvent.delete();
      res.status(200).json({ msg: "Event deleted" });
    } catch (err) {
      console.log(err);
      return res.status(500).json({ err: err.message });
    }
  });
  











module.exports=router