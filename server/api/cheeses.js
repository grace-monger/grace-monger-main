const cheeseRouter = require("express").Router();
const { Cheese, Wine } = require("../db");

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

// get route for single cheese
cheeseRouter.get("/:id", async (req, res, next) => {
  try {
    const cheeseAndPair = await Cheese.findByPk(req.params.id, {
      include: [
        {
          model: Wine,
        },
      ],
    });
    res.status(200).send(cheeseAndPair);
  } catch (error) {
    next(error);
  }
});

//PUT ROUTE FOR UPDATING SINGLE CHEESE
cheeseRouter.put("/:id", async (req, res, next) => {
  try {
    const cheese = await Cheese.findByPk(req.params.id);
    res.send(await cheese.update(req.body));
  } catch (error) {
    next(error);
  }
});

module.exports = cheeseRouter;
