// Cody's cafe
// Cart has many wines thru this

// Table the cart stuff for Friday

const { Sequelize, DataTypes } = require("sequelize");
const db = require("../db");

const Order = db.define("order", {
  fulfilled: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
    defaultValue: false,
    validate: {
      notEmpty: true,
    },
  }
});

module.exports = Order
