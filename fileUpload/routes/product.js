const express=require("express")
const router=express.Router()
const {isAuthenticated,isSeller,isBuyer}=require("../middlewares/auth")
const upload=require("../utils/fileupload")
const Product = require("../models/product")
const {stripeKey}=require("../config/credentials")
const Order = require("../models/orderModel")
const stripe=require("stripe")(stripeKey)
const {WebhookClient}=require("discord.js")
const webhook=new WebhookClient({
  url:"https://discord.com/api/webhooks/1054818795581095968/R1dh6MizhWqk4a4tnPqVFqbxCZuRKum0aiEdn2HIWVPiYPCKovyG6QNMcplRiRlqP9QR"
})
webhook.send({
  content:"created anproduct from day 10 using stripe"
})
router.post("/create", isAuthenticated, isSeller, (req, res) => {
    upload(req, res, async (err) => {
      if (err) {
        return res.status(500).send({ err: err.message });
      }
      console.log(req.body.file, req.body.price, req.body.file);
      if (!req.body.name || !req.body.price || !req.file) {
        return res
          .status(400)
          .json({ err: "All fields should be selected - name, price, file" });
      }
  
      if (isNaN(req.body.price)) {
        return res.status(400).json({ err: "Price must be a number" });
      }
  
      let productDetails = {
        name: req.body.name,
        price: req.body.price,
        content: req.file.path,
      };
      
      const createdProduct = await Product.create(productDetails);
  
      console.log("Created Product", createdProduct);
      
      return res.status(201).json({ message: "Product created" });
    });
  });
  
  router.get("/get/all", isAuthenticated, async (_req, res) => {
    try {
      const products = await Product.findAll();
      return res.status(200).json({ Products: products });
    } catch (err) {
      console.log(err.message);
      return res.status(500).json({ err: err.message });
    }
  });
router.post("/buy/:productId",isAuthenticated,isBuyer,async (req,res)=>{
  try {
      const productFind=await Product.findOne({where:{id:req.params.productId}})
      const product=productFind.dataValues;
      console.log(">>>>>.",product)
      if(!product){
        return res.status(401).json({"err":"Product Not Found"})
      }
      const orderDetails={
        productId:product.id,
        buyerId:req.user.id
      }
      console.log(">>")
      // let payment=await stripe.create({
      //   type:"card",
      //   card:{
      //     number:"4444333322221111",
      //     exp_month:"9",
      //     exp_year:"2023",
      //     cvc:"314"
      //   }  
      // });
      // let paymentIntent=await stripe.paymentIntent.create({
      //   ammount: product.price,
      //   currency:"inr",
      //   payment_method_types:["card"],
      //   payment_method:payment.id,
      //   confirm: true
      // });
      const paymentMethod = await stripe.paymentMethods.create({
        type: 'card',
        card: {
          number: '4242424242424242',
          exp_month: 8,
          exp_year: 2023,
          cvc: '314',
        },
      });
  
      let paymentIntent = await stripe.paymentIntents.create({
        amount: product.dataValues.price * 100,
        currency: "inr",
        payment_method_types: ["card"],
        payment_method: paymentMethod.id,
        confirm: true,
      });
      console.log(">>>>")
      if(paymentIntent){
        const createOrder= await Order.create(orderDetails)
        webhook.send({
          content:"created anproduct from day 10 using stripe"
        })
        return res.status(200).json({
          createOrder
        })
      }
      else{
        return res.status(400).json({
          err:"payment failure"
        })
      }

  } catch (error) {
  
  }
})
  
module.exports=router