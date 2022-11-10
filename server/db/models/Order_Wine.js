const { Sequelize, DataTypes } = require("sequelize");
const db = require("../db");

const Order_Wine = db.define("Order_Wine", {
  dummyColumn: {
    type: DataTypes.STRING,
    defaultValue: "hi",
  },
});

module.exports = Order_Wine;
