const cheeseRouter = require("express").Router;
const { Cheese } = require("../db/index");

console.log("cheese", Cheese)

cheeseRouter.get('/', async (req, res, next) => {
    try {
        const allCheeses = await Cheese.findAll()
        res.status(200).send(allCheeses)
    } catch (error) {
        next(error)
    }
})

module.exports = cheeseRouter