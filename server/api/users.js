const router = require("express").Router();
const { User } = require("../db");
module.exports = router;

router.get("/", async (req, res, next) => {
  try {
    const users = await User.findAll({
      // explicitly select only the id and username fields - even though
      // users' passwords are encrypted, it won't help if we just
      // send everything to anyone who asks!
      attributes: ["id", "userName"],
    });
    res.json(users);
  } catch (err) {
    next(err);
  }
});

router.get("/all", async (req, res, next) => {
  try {
    const users = await User.findAll();
    console.log('USERS FROM API')
    res.send(users);
  } catch (error) {
    next(error);
  }
});
