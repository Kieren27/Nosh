const { 
  buildTables,
  createInitialUsers
} = require("../db/seed_db");

const setup = async () => {
  console.log("--- JEST SETUP ---");
  await buildTables();
  await createInitialUsers();
}

module.exports = setup;