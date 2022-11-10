const orderRouter = require("express").Router();
const { Order } = require("../db");

// orderRouter.get("/", async (req, res, next) => {
//   const order = await Order.findAll();
// });

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

module.exports = orderRouter;
