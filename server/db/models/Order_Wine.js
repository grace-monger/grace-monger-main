const { Sequelize, DataTypes } = require("sequelize");
const db = require("../db");

const Order_Wine = db.define("Order_Wine");

module.exports = Order_Wine;
