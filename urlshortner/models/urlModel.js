const {Model,DataTypes}=require("sequelize")
const sequelize=require("../config/db")

class Url extends Model{

}
Url.init({
    longUrl:{
        type:DataTypes.STRING,
        allowNull: false
    },
    shortUrl:{
        type:DataTypes.STRING,
        allowNull: false
    },
},
{
    sequelize,modelName: "Url"

}
);

module.exports = Url;