const { Sequelize, DataTypes } = require("sequelize");
const db = require("../db");

const Wine = db.define("wine", {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      notEmpty: true,
    },
  },
  region: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      notEmpty: true,
    },
  },
  year: {
    type: DataTypes.INTEGER,
    allowNull: false,
    validate: {
      notEmpty: true,
    },
  },
  type: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      notEmpty: true,
      isIn: [["red", "white", "orange", "rosé"]],
    },
  },
  typeOfGrape: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      notEmpty: true,
    },
  },
  tastingNotes: {
    type: DataTypes.TEXT,
  },
  price: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false,
    defaultValue: 19.99,
    validate: {
      isDecimal: true,
    },
  },
  quantity: {
    type: DataTypes.INTEGER,
    allowNull: false,
    defaultValue: 20,
    validate: {
      notEmpty: true,
    },
  },
  imageUrl: {
    type: DataTypes.TEXT,
    defaultValue:
      "https://cdn.thecoolist.com/wp-content/uploads/2021/05/Types-of-wine.jpg",
  },
});

module.exports = Wine