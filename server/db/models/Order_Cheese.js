const { Sequelize, DataTypes } = require("sequelize");
const db = require("../db");

const Order_Cheese = db.define("Order_Cheese", {
  dummyColumn: {
    type: DataTypes.STRING,
    defaultValue: "hi",
  },
});

const Order_Cheese = db.define("Order_Cheese");

module.exports = Order_Cheese;
