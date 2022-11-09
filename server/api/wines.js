const wineRouter = require("express").Router();
const { Wine, Cheese } = require("../db");

// GET route = /api/wines
wineRouter.get("/", async (req, res, next) => {
  try {
    const allWines = await Wine.findAll();
    res.status(200).send(allWines);
  } catch (error) {
    next(error);
  }
});

// GET route = /api/:id
wineRouter.get("/:id", async (req, res, next) => {
  try {
    const wineAndPair = await Wine.findByPk(req.params.id, {
      include: [
        {
          model: Cheese,
        },
      ],
    });
    res.json(wineAndPair);
  } catch (error) {
    next(error);
  }
});

module.exports = wineRouter;
