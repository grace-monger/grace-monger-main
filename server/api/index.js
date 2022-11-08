<<<<<<< HEAD
const router = require("express").Router();

router.use("/users", require("./users"));

router.use("/wines", require("./wines"));
router.use("/cheeses", require("./cheeses"));

router.use((req, res, next) => {
  const error = new Error("Not Found");
  error.status = 404;
  next(error);
});

module.exports = router;
=======
const router = require("express").Router();

router.use("/users", require("./users"));

router.use("/wines", require("./wines"));
router.use("/cheeses", require("./cheeses"));

router.use((req, res, next) => {
  const error = new Error("Not Found");
  error.status = 404;
  next(error);
});

module.exports = router;
>>>>>>> main
