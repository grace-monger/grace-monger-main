"use strict";
const { BulkRecordError } = require("sequelize");
const { db, User, Cheese, Wine, Order, Order_Wine, Order_Cheese } = require("../server/db");
const cheeseData = require("./cheeseData");
const wineData = require("./wineData");
const userData = require("./userData");
const wineCart = require('./wineCart')
const cartData = require('./cartData')
const cheeseCart = require('./cheeseCart')

/**
 * seed - this function clears the database, updates tables to
 *      match the models, and populates the database.
 */

const seed = async () => {
  try {
    await db.sync({ force: true });
    console.log("db synced");

    await Promise.all(
      cheeseData.map((cheese) => {
        return Cheese.create(cheese);
      })
    );

    await Promise.all(
      wineData.map((wine) => {
        return Wine.create(wine);
      })
    );

    await Promise.all(
      userData.map((user) => {
        return User.create(user);
      })
    );

    await Promise.all(
      cartData.map((order) => {
        return Order.create(order)
      })
    )

    await Promise.all(
      wineCart.map((wine) => {
        return Order_Wine.create(wine)
      })
    )

    await Promise.all(
      cheeseCart.map((cheese) => {
        return Order_Cheese.create(cheese)
      })
    )

    console.log(`seeded ${cheeseData.length} cheeses`);
    console.log(`seeded ${wineData.length} wines`);
    console.log(`seeded ${userData.length} users`);
    console.log(`seeded ${cartData.length} carts`);
    console.log(`seeded ${wineCart.length} wines in carts`);
    console.log(`seeded ${cheeseCart.length} cheeses in carts`);
    console.log("seeded successfully");
  } catch (err) {
    console.log(err);
  }
};
// async function seed() {
//   await db.sync({ force: true }) // clears db and matches models to tables
//   console.log('db synced!')

//   // Creating Cheeses
//   const cheeses = await Promise.all([
//     Cheese.create({ username: 'cody', password: '123' }),
//     Cheese.create({ username: 'murphy', password: '123' }),
//   ])

//   console.log(`seeded ${users.length} users`)
//   console.log(`seeded successfully`)
//   return {
//     users: {
//       cody: users[0],
//       murphy: users[1]
//     }
//   }
// }

/*
 We've separated the `seed` function from the `runSeed` function.
 This way we can isolate the error handling and exit trapping.
 The `seed` function is concerned only with modifying the database.
*/
async function runSeed() {
  console.log("seeding...");
  try {
    await seed();
  } catch (err) {
    console.error(err);
    process.exitCode = 1;
  } finally {
    console.log("closing db connection");
    await db.close();
    console.log("db connection closed");
  }
}

/*
  Execute the `seed` function, IF we ran this module directly (`node seed`).
  `Async` functions always return a promise, so we can use `catch` to handle
  any errors that might occur inside of `seed`.
*/
if (module === require.main) {
  runSeed();
}

// we export the seed function for testing purposes (see `./seed.spec.js`)
module.exports = seed;
