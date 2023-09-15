const client = require('./client');

async function createRestaurant({
  cuisine, 
  name,
  address,
  price,
  site_link
}) {
  const date = new Date();
  console.log(date);
  const {rows: [restaurant]} = await client.query(`
    INSERT INTO restaurants(cuisine, name, address, price, site_link)
    VALUES ($1, $2, $3, $4, $5)
    RETURNING *;
  `, [cuisine, name, address, price, site_link]);
  return restaurant;
}

async function getAllRestaurants() {
  return 'fake restaurants';
}

async function getRestaurantsByCategory() {
  return 'fake restaurants';
}

async function getRestaurantsByName() {
  return 'fake restaurants';
}

async function getRestaurantById() {
  return 'fake restaurant';
}

async function updateRestaurant() {
  return 'fake restaurant';
}

async function deleteRestaurant() {
  return 'fake restaurant';
}

module.exports = {
  createRestaurant,
  getAllRestaurants,
  getRestaurantsByCategory,
  getRestaurantsByName,
  getRestaurantById,
  updateRestaurant,
  deleteRestaurant
}