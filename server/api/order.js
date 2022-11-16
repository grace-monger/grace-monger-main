const orderRouter = require("express").Router();
const { reset } = require("nodemon");
const { Order, Cheese, Wine, Order_Wine, Order_Cheese } = require("../db");

orderRouter.get("/:id", async (req, res, next) => {
  console.log("get all orders in get route backend")
  try {
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

// orderRouter.delete("/:id", async (req, res, next) => {
//   try {
//     const cheeseOrder = await Order_Cheese.findByPk(req.params.id);
//     const wineOrder = await Order_Wine.findByPk(req.params.id);
//     await wineOrder.destroy();
//     await cheeseOrder.destroy();
//     const order = [wineOrder, cheeseOrder];
//     res.send(order);
//   } catch (error) {
//     next(error);
//   }
// });

orderRouter.get("/:id", async (req, res, next) => {
  try {
    const wineOrder = await Order_Wine.findOne({
      where: {
        orderId: req.body.orderId,
        wineId: req.params.id,
      },
    });
    res.status(200).send(wineOrder);
  } catch (error) {
    next(error);
  }
});

orderRouter.delete("/removeWine/:id", async (req, res, next) => {
  const array = req.params.id.split("-");
  const orderId = array[0];
  const productId = array[1];
  try {
    const wineOrder = await Order_Wine.findOne({
      where: {
        orderId: orderId,
        wineId: productId,
      },
    });
    await wineOrder.destroy();
    res.send(wineOrder);
  } catch (error) {
    next(error);
  }
});

orderRouter.delete("/removeCheese/:id", async (req, res, next) => {
  const array = req.params.id.split("-");
  const orderId = array[0];
  const productId = array[1];
  try {
    const cheeseOrder = await Order_Cheese.findOne({
      where: {
        orderId: orderId,
        cheeseId: productId,
      },
    });
    await cheeseOrder.destroy();
    res.send(cheeseOrder);
  } catch (error) {
    next(error);
  }
});

orderRouter.post("/cheese", async (req, res, next) => {
  const user = req.body.userId;
  const product = parseInt(req.body.productId);

  try {
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

  try {
    let [order, created] = await Order.findOrCreate({
      where: {
        userId: user,
        fulfilled: false,
      },
    });

    // if this is the first time making orderId go here
    if (created) {
      const addWine = await Order_Wine.create({
        orderId: order.id,
        wineId: product,
      });
      res.send(addWine);
    }

    // if orderId already exist just add products
    if (created == false) {
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

      res.send(getAllWinesInThatOrderId);
    }
  } catch (error) {
    next(error);
  }
});

orderRouter.put("/updateCheese", async (req, res, next) => {
  try {
    const findCheeseOrder = await Order_Cheese.findOne({
      where: {
        orderId: req.body.orderId,
        cheeseId: req.body.productId,
      },
    });

    await findCheeseOrder.update(req.body)

    res.send(findCheeseOrder)
  } catch (error) {
    next(error);
  }
});

orderRouter.put("/updateWine", async (req, res, next) => {
  try {
    const findWineOrder = await Order_Wine.findOne({
      where: {
        orderId: req.body.orderId,
        wineId: req.body.productId,
      },
    });

    await findWineOrder.update(req.body)

    res.send(findWineOrder)
  } catch (error) {
    next(error);
  }
});

orderRouter.put("/updateOrder", async (req, res, next) => {
  try {
    console.log('REQUESTBODY', req.body)
    const order = await Order.findOne({
      where: {
        userId: req.body.userId
      }
    });
    res.send(await order.update(req.body))
    res.sendStatus(203)
  } catch (error) {
    next(error);
  }
});

module.exports = orderRouter;
