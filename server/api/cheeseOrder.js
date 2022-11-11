const cheeseOrderRouter = require("express").Router();
const { Order, Cheese, Order_Cheese } = require("../db");

cheeseOrderRouter.get("/:id", async (req, res, next) => {
  try {
    const userOrder = await Order.findAll({
      where: {
        userId: req.params.id,
        fulfilled: false,
      },
      include: {
        model: Cheese,
        through: "Order_Cheese",
      },
    });
    res.status(200).send(userOrder);
  } catch (error) {
    next(error);
  }
});

// Delete entire cart route - not just one single item
cheeseOrderRouter.delete("/:id", async (req, res, next) => {
  try {
    const order = await Order.findOne({
      where: {
        userId: req.params.id,
        fulfilled: false,
      },
      include: {
        model: Cheese,
        through: "Order_Cheese",
      },
    });
    await order.destroy();
    res.send(order);
  } catch (error) {
    next(error);
  }
});

// want to remove the product from the order section of the database not from the whole database
// getting confused by grabbing the id ? which id are we grabbing exactly - we have to find out what data we are working with when we get to the cart view

module.exports = cheeseOrderRouter;
