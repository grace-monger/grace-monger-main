const { Sequelize, DataTypes } = require("sequelize");
const db = require("../db");

const Order_Wine = db.define("Order_Wine", {
    quantity: {
        type: DataTypes.INTEGER,
        defaultValue: 1
    }
});

module.exports = Order_Wine;
