const {Sequelize}=require("sequelize")

const createDb = new Sequelize('fileupload', 'santhosh', 'santhosh', {
    host: 'localhost',
    dialect: 'postgres'
  });

  const connectDB=() => {
    createDb
      .sync()
      .then((res) => {
        console.log("Successfully connected to database");
      })
      .catch((err) => console.log("Cannot connect to database due to:", err));
  };
module.exports={connectDB,createDb}