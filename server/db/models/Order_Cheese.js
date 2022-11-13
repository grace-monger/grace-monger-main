const { Sequelize, DataTypes } = require("sequelize");
const db = require("../db");

const Order_Cheese = db.define("Order_Cheese", {
    quantity: {
        type: DataTypes.INTEGER,
        defaultValue: 1
    }
});

module.exports = Order_Cheese;
