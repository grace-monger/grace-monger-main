//this is the access point for all things database related!

const db = require("./db");

const Cheese = require("./models/Cheese");
const Wine = require("./models/Wine");

const User = require("./models/User");

//associations could go here!

Cheese.hasOne(Wine);
Wine.hasOne(Cheese);

module.exports = {
  db,
  User,
  Cheese,
  Wine,
};
