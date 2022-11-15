// store all of our functions that will act as middleware between our request and our response

const { User } = require("../db");

const requireToken = async (req, res, next) => {
  try {
    // if we manage to make it past require token we can guarentee that we have a user
    // we have access to req.user
    const token = req.headers.authorization;
    const user = await User.findByToken(token);
    req.user = user;
    next();
  } catch (error) {
    next(error);
  }
};

const isAdmin = (req, res, next) => {
  if (!req.user.isAdmin) {
    return res.status(403).send("You shall not pass!");
  } else {
    //if my user is an admin pass them foward
    next()
  }
};

module.exports = {
  requireToken,
  isAdmin,
};
