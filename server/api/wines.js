const WineRouter = require("express").Router();
const { Wine } = require("../db");

// GET route = /api/wines
WineRouter.get("/", async (req, res, next) => {
  try {
    const allWines = await Wines.findAll();
    res.status(200).send(allWines);
  } catch (error) {
    next(error);
  }
});

// GET route = /api/:id
WineRouter.get("/:id/wines", async (req, res, next) => {
  try {
    const wine = await Wine.findByPk(req.params.id);
    res.json(wine);
  } catch (error) {
    next(error);
  }
});
