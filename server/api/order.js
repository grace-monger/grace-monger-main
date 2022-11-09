const orderRouter = require("express").Router();
const { Order } = require("../db");

// console.log("cheese", Cheese)

// Get route for all cheeses 
orderRouter.get("/", async (req, res, next) => {
  try {
    const order = await Order.create();
    res.status(200).send(order);
  } catch (error) {
    next(error);
  }
});

module.exports = orderRouter;