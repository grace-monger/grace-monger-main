const wineOrderRouter = require("express").Router();
const { Order, Wine, Order_Wine } = require("../db");

// want to remove the product from the order section of the database not from the whole database
// getting confused by grabbing the id ? which id are we grabbing exactly - we have to find out what data we are working with when we get to the cart view

module.exports = wineOrderRouter;
