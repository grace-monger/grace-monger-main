const orderRouter = require("express").Router();
const { Order, Cheese, Wine, Order_Wine, Order_Cheese } = require("../db");

orderRouter.get("/:id", async (req, res, next) => {
  try {
    // need to query order table with user id using req.params.id
    // need to query Order_Wines table by order ID and get all of those wines in that table
    const wineOrder = await Order.findAll({
      where: {
        userId: req.params.id,
        fulfilled: false,
      },
      include: {
        model: Wine,
        through: "Order_Wine",
      },
    });

    const cheeseOrder = await Order.findAll({
      where: {
        userId: req.params.id,
        fulfilled: false,
      },
      include: {
        model: Cheese,
        through: "Order_Cheese",
      },
    });
    const userOrder = [wineOrder, cheeseOrder];
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

// want to remove the product from the order section of the database not from the whole database
// getting confused by grabbing the id ? which id are we grabbing exactly - we have to find out what data we are working with when we get to the cart view

orderRouter.post("/cheese", async (req, res, next) => {
  // req.body will be product id and user.id
  const user = req.body.userId;
  const product = parseInt(req.body.productId);
  console.log("product in post", product);

  try {
    // make order only
    let [order, created] = await Order.findOrCreate({
      where: {
        userId: user,
        fulfilled: false,
      },
    });

    // if this is the first time making orderId go here
    if (created) {
      const addCheese = await Order_Cheese.create({
        orderId: order.id,
        cheeseId: product,
      });
      res.send(addCheese);
    }

    // if orderId already exist just add products
    if (created === false) {
      const newCheeseToAddToExistingOrder = {
        orderId: order.id,
        cheeseId: product,
      };

      Order_Cheese.create(newCheeseToAddToExistingOrder);

      const getAllCheeseInThatOrderId = await Order_Cheese.findAll({
        where: {
          orderId: order.id,
        },
      });
      res.send(getAllCheeseInThatOrderId);
    }
  } catch (error) {
    next(error);
  }
});

orderRouter.post("/wine", async (req, res, next) => {
  const user = req.body.userId;
  const product = parseInt(req.body.productId);
  console.log("product in order wine post", product);
  try {
    let [order, created] = await Order.findOrCreate({
      where: {
        userId: user,
        fulfilled: false,
      },
    });

    console.log("created", created);
    console.log("orderId", order.id);

    // if this is the first time making orderId go here
    if (created) {
      //   // add product id to that order
      console.log("just got created");
      const addWine = await Order_Wine.create({
        orderId: order.id,
        wineId: product,
      });
      console.log("newWine added to order-wine", addWine);
      res.send(addWine);
    }

    // if orderId already exist just add products
    if (created == false) {
      console.log("i already exist so in false if");

      const newWineToAddToExistingOrder = {
        orderId: order.id,
        wineId: product,
      };

      Order_Wine.create(newWineToAddToExistingOrder);

      const getAllWinesInThatOrderId = await Order_Wine.findAll({
        where: {
          orderId: order.id,
        },
      });

      console.log("WINES IN ORDERWINE", getAllWinesInThatOrderId);
      res.send(getAllWinesInThatOrderId);
    }
  } catch (error) {
    next(error);
  }
});

module.exports = orderRouter;
