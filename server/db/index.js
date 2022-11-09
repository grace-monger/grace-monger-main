//this is the access point for all things database related!

const db = require("./db");

const Cheese = require("./models/Cheese");
const Wine = require("./models/Wine");
const Order = require('./models/Order')

const User = require("./models/User");

//associations could go here!

Cheese.hasOne(Wine);
Wine.belongsTo(Cheese);
Wine.hasOne(Cheese)
Cheese.belongsTo(Wine)

User.hasMany(Order)
Order.belongsToMany(Cheese, { through: 'Order_Cheese'})
Order.belongsToMany(Wine, { through: 'Order_Wine'})

module.exports = {
  db,
  User,
  Cheese,
  Wine,
  Order
};
