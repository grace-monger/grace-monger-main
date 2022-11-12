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

// PUT route = '/:id'

wineRouter.put("/:id", async (req, res, next) => {
  try {
    const wine = await Wine.findByPk(req.params.id);
    res.send(await wine.update(req.body));
  } catch (error) {
    next(error);
  }
});

// POST route = '/'

wineRouter.post("/", async (req, res, next) => {
  try {
    const newWine = await Wine.create(req.body);
    res.status(201).send(newWine);
  } catch (error) {
    next(error);
  }
});

// DELETE route = '/:id

wineRouter.delete("/:id", async (req, res, next) => {
  try {
    const wine = await Wine.findByPk(req.params.id);
    await wine.destroy();
    res.send(wine);
  } catch (error) {
    next(error);
  }
});

module.exports = wineRouter;
