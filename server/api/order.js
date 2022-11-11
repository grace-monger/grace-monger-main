const orderRouter = require("express").Router();
const { Order, Wine, Order_Wines } = require("../db");

orderRouter.get("/:id", async (req, res, next) => {
  try {
    // need to query order table with user id using req.params.id
    // need to query Order_Wines table by order ID and get all of those wines in that table
    const userOrder = await Order.findAll({
      where: {
        userId: req.params.id,
        fulfilled: false,
      },
      include: {
        model: Wine,
        through: "Order_Wine",
      },
    });
    // console.log(userOrder);
    // const wineOrders = await Order_Wines.findAll({
    //   where: {
    //     orderId: userOrder.order.dataValues.id,
    //   },
    // });
    // console.log(userOrder)
    res.status(200).send(userOrder);
  } catch (error) {
    next(error);
  }
});

// Delete entire cart route - not just one single item
orderRouter.delete("/:id", async (req, res, next) => {
  try {
    const order = await Order.findOne({
      where: {
        userId: req.params.id,
        fulfilled: false,
      },
      include: {
        model: Wine,
        through: "Order_Wine",
      },
    });
    await order.destroy();
    res.send(order);
  } catch (error) {
    next(error);
  }
});

// orderRouter.post("/", async (req, res, next) => {
//   try {
//     //pass in userid
//     const order = await Order.create();
//     console.log("order posted");
//     res.status(200).send(order);
//   } catch (error) {
//     next(error);
//   }
// });

// want to remove the product from the order section of the database not from the whole database
// getting confused by grabbing the id ? which id are we grabbing exactly - we have to find out what data we are working with when we get to the cart view

module.exports = orderRouter;
