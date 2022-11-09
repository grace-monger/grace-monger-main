const cheeseRouter = require("express").Router();
const { Cheese } = require("../db");

// console.log("cheese", Cheese)

// Get route for all cheeses 
cheeseRouter.get("/", async (req, res, next) => {
  try {
    const allCheeses = await Cheese.findAll();
    res.status(200).send(allCheeses);
  } catch (error) {
    next(error);
  }
});

module.exports = cheeseRouter;
