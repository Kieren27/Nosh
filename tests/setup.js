const { buildTables } = require("../db/seed_db");

const setup = async () => {
  console.log("--- JEST SETUP ---");
  await buildTables();
}

module.exports = setup;