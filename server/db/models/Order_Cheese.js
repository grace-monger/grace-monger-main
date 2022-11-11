const { Sequelize, DataTypes } = require("sequelize");
const db = require("../db");

const Order_Cheese = db.define("Order_Cheese", {
  dummyColumn: {
    type: DataTypes.STRING,
    defaultValue: "hi",
  },
});

module.exports = Order_Cheese;
