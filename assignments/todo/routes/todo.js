const express=require("express");
const router=express.Router()
const {Task}=require("../models/todo")

router.post("/todo/", async (req,res)=>{
    try {
        if(!req.body.title){
            return res.status(400)
        }
    
        let task={
            title:req.body.title,
            description: req.body.description,
            dueDate:req.body.dueDate,
            completed:req.body.completed,
            priority:req.body.priority
        }
        task.dueDate=new Date(task.dueDate).toISOString()
        console.log(task)
        let taskDetails=await Task.create(task)
        let response={
                "id": taskDetails.dataValues.id,
                "title": taskDetails.dataValues.title,
                "description": taskDetails.dataValues.description,
                "completed": taskDetails.dataValues.completed,
                "priority": taskDetails.dataValues.priority,
                "dueDate": taskDetails.dataValues.dueDate,
        }
        return res.status(201).send(response)
    
    
    } catch (error) {
        return res.status(501).send(error)
    }

  
})

router.put("/todo/:id",async (req,res)=>{
    try {
        let data= await Task.findOne({where:{id:req.params.id}})
        if(data){
            let updatedData=await Task.update(req.body,{where:{id:req.params.id}})
            return res.status(200).send(req.body)
        }
        return res.status(404)
    } catch (error) {
        return res.status(404).send(error)
    }
})

router.get("/todo/",async(req,res)=>{

    try {
        let tasklist=await Task.findAll()
        if(tasklist){
            return res.status(200).send(tasklist)
        }
        return res.status(404)
    } catch (error) {
        return res.status(404).send(error)
    }


})

router.get("/todo/:id",async(req,res)=>{
    try {
        let taskData=await Task.findOne({where:{id:req.params.id}})
        if(taskData){
            return res.status(200).send(taskData)
        }
        return res.status(404).send(taskData)
    } catch (error) {
        return res.status(404).send(error)
    }

})


router.delete("/todo/:id",async(req,res)=>{
    try {
        let deleteData=await Task.destroy({where:{id:req.params.id}})
        if(deleteData){
            return res.status(200).send("Deleted")

        }
        return res.status(404)
    } catch (error) {
        return res.status(404).send(error)
    }
})




module.exports=router