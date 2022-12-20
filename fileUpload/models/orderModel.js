const sequelize=require("sequelize")
const {createDb}=require("../config/db")
const {DataTypes}=require("sequelize")
const userModel=require("../models/user")


const Order=createDb.define("order",{
    id:{
        primaryKey:true,
        allowNull:false,
        autoIncrement:true,
        type:DataTypes.INTEGER
    },
    productId:DataTypes.INTEGER,
    buyerId:DataTypes.INTEGER
})

Order.belongsTo(userModel,{foreignKey:"buyerId"})
userModel.hasMany(Order,{foreignKey:"id"})

module.exports=Order