const orderRouter = require("express").Router();
const { Order } = require("../db");
 
orderRouter.get("/", async (req, res, next) => {
  try {
    const order = await Order.create();
    res.status(200).send(order);
  } catch (error) {
    next(error);
  }
});

module.exports = orderRouter;