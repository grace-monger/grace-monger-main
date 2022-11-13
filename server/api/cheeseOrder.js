const cheeseOrderRouter = require("express").Router();
const { Order, Cheese, Order_Cheese } = require("../db");

cheeseOrderRouter.get("/:id", async (req, res, next) => {
  try {
    const cheeseOrder = await Order_Cheese.findOne({
      where: {
        cheeseId: req.params.id,
      },
    });
    res.status(200).send(cheeseOrder);
  } catch (error) {
    next(error);
  }
});

cheeseOrderRouter.delete("/:id", async (req, res, next) => {
  try {
    const cheeseOrder = await Order_Cheese.findOne({
      where: {
        cheeseId: req.params.id,
      },
    });
    await cheeseOrder.destroy();
    res.send(cheeseOrder);
  } catch (error) {
    next(error);
  }
});

// want to remove the product from the order section of the database not from the whole database
// getting confused by grabbing the id ? which id are we grabbing exactly - we have to find out what data we are working with when we get to the cart view

module.exports = cheeseOrderRouter;
