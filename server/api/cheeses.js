const cheeseRouter = require("express").Router();
const { Cheese } = require("../db");

// console.log("cheese", Cheese)

cheeseRouter.get("/", async (req, res, next) => {
  try {
    const allCheeses = await Cheese.findAll();
    res.json(allCheeses);
  } catch (error) {
    next(error);
  }
});

module.exports = cheeseRouter;
