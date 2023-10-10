const { 
  buildTables,
  createInitialRestaurants,
  createInitialUsers
} = require("../db/seed_db");

const setup = async () => {
  console.log("--- JEST SETUP ---");
  await buildTables();
  await createInitialUsers();
  await createInitialRestaurants();
}

module.exports = setup;