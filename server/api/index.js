const router = require("express").Router();

router.use("/users", require("./users"));
router.use("/order", require("./order"));
router.use("/cheeseOrder", require("./cheeseOrder"));
// router.use("/wineOrder", require("./wineOrder"));

router.use("/wines", require("./wines"));
router.use("/cheeses", require("./cheeses"));

router.use((req, res, next) => {
  const error = new Error("Not Found");
  error.status = 404;
  next(error);
});

module.exports = router;
