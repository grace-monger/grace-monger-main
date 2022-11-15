const { Sequelize, DataTypes } = require("sequelize");
const db = require("../db");

const Order_Wine = db.define("Order_Wine", {
  quantity: {
    type: DataTypes.INTEGER,
    defaultValue: 1,
  },
  price: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false,
    defaultValue: 0.00,
    validate: {
      isDecimal: true,
    },
  },
});

module.exports = Order_Wine;
