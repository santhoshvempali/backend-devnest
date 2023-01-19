const { DataTypes } = require("sequelize");
const { createDb } = require("../config/db");

const Product = createDb.define("task", {
  id: {
    primaryKey: true,
    autoIncrement: true,
    type: DataTypes.INTEGER,
  },
  name: {
    allowNull: false,
    type: DataTypes.STRING,
  },
  description: { allowNull: false, type: DataTypes.STRING },
  date: { type: DataTypes.DATE, allowNull: false },
  productImage: {
    allowNull: false,
    type: DataTypes.STRING,
  },
  brand: { allowNull: false, type: DataTypes.STRING },
  cost: {
    allowNull: false,
    type: DataTypes.INTEGER,
  },
});

module.exports = { Product };
