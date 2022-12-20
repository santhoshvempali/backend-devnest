const jwt=require("jsonwebtoken");
const User = require("../models/user");
const isAuthenticated=async(req,res,next)=>{
    try {
        const authHeader=req.headers.authorization; //Bearer Token
        if(!authHeader){
            return res.status(401).json({
                err:"authorization header not found"
            })
        }
        const token=authHeader.split(" ")[1]
        if(!token){
            return res.status(401).json({
                err:"token  not found"
            })
        }
        const decoded=jwt.verify(token,"santhosh")
        const user=await User.findOne({where:{id:decoded.user.id}})
        if (!user) {
            return res.status(404).json({ err: "User not found" });
          }
      
        req.user = user;
        console.log(req.user)
        next();
    } catch (error) {
            console.log(error);
            res.status(401).json({
              err: error.message,
            });
          }
}

const isSeller = (req, res, next) => {
    if (req.user.dataValues.isSeller) {
      next();
    } else {
      res.status(401).json({
        err: "You are not a seller",
      });
    }
  };

const isBuyer = (req, res, next) => {
    if (!req.user.dataValues.isSeller) {
      next();
    } else {
      res.status(401).json({
        err: "You are not a Buyer",
      });
    }
  };


module.exports={isAuthenticated,isSeller,isBuyer}