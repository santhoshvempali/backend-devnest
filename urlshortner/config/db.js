const {Sequelize}=require("sequelize")

const createDb = new Sequelize('store', 'santhosh', 'santhosh', {
    host: 'localhost',
    dialect: 'postgres'
  });

module.exports=createDb