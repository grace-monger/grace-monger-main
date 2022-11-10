const orderRouter = require("express").Router();
const { Order } = require("../db");

orderRouter.get("/", async (req, res, next) => {
  try {
    // need to query order table with user id using req.params.id
    // need to query Order_Wines table by order ID and get all of those wines in that table
    // const userOrder = await Order.findOne({
    //   where: {
    //     userId: req.params.
    //   },
    // });
    console.log("THIS IS REQ.PARAMS ID", req.params.id);
    // res.status(200).send(order);
    res.sendStatus(200);
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
