const express=require("express");
const router=express.Router()
const {Product}=require("../models/product")

router.post("/add",async(req,res)=>{
    try {
    let productData={
        name:req.body.name,
        description:req.body.description,
        productImage:req.body.productImage,
        date:req.body.date,
        brand:req.body.brand,
        cost:req.body.cost
    }
    productData.date=new Date(productData.date).toISOString()
    let data=await Product.create(productData)
    let response=data.dataValues.data
    return res.status(201).json({
        data:response
    })
} catch (error) {
       return res.status(501).send(error)
}
})

router.put("/:id",async(req,res)=>{
    try {
        let data=await Product.findOne({where:{id:req.params.id}})
        if(data){
            let updatedData=await Product.update(req.body,{where:{id:req.params.id}})
            return res.status(200).send(req.body);
        }
    } catch (error) {
        return res.status(404).send(error)
    }
})


module.exports=router





