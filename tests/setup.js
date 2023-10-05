const { 
  buildTables,
  createInitialRestaurants
} = require("../db/seed_db");

const setup = async () => {
  console.log("--- JEST SETUP ---");
  await buildTables();
  await createInitialRestaurants();
}

module.exports = setup;