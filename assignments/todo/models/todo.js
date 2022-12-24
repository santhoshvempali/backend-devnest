const {DataTypes}=require("sequelize")
const {createDb}=require("../config/db")

const Task=createDb.define("task",{
    id:{
        primaryKey:true,
        autoIncrement:true,
        type:DataTypes.INTEGER
    },
    title:{
        allowNull: false,
        type: DataTypes.STRING
    },
    description: DataTypes.STRING,
    dueDate:DataTypes.DATE,
    completed:DataTypes.BOOLEAN,
    priority:DataTypes.INTEGER
})

module.exports={Task}