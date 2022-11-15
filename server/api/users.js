const router = require("express").Router();
const { User } = require("../db");
const { requireToken, isAdmin } = require("./gateKeepingMiddleware")
module.exports = router;

// require token makes sure user is loggedin 

router.get("/", requireToken,  async (req, res, next) => {
  try {
    // if we manage to make it past require token we can guarentee that we have a user 
    // we have access to req.user
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
