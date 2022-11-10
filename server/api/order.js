const orderRouter = require("express").Router();
const { Order } = require("../db");

orderRouter.get("/:id", async (req, res, next) => {
  try {
    const order = await Order.findByPk(req.params.id);
    res.status(200).send(order);
  } catch (error) {
    next(error);
  }
});

orderRouter.post("/", async (req, res, next) => {
  try {
    //pass in userid
    const order = await Order.create();
    console.log("order posted");
    res.status(200).send(order);
  } catch (error) {
    next(error);
  }
});

// want to remove the product from the order section of the database not from the whole database
// getting confused by grabbing the id ? which id are we grabbing exactly - we have to find out what data we are working with when we get to the cart view
orderRouter.delete("/:id", async (req, res, next) => {
  try {
    const order = await Order.findByPk(req.params.id);
    await order.destroy();
  } catch (error) {
    next(error);
  }
});

module.exports = orderRouter;
