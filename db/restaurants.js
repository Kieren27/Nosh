const client = require('./client');

async function createRestaurant({
  cuisine, 
  name,
  address,
  price,
  site_link
}) {
  const {rows: [restaurant]} = await client.query(`
    INSERT INTO restaurants(cuisine, name, address, price, site_link)
    VALUES ($1, $2, $3, $4, $5)
    RETURNING *;
  `, [cuisine, name, address, price, site_link]);
  console.log('Restaurant:', restaurant);
  return restaurant;
}

async function getAllRestaurants() {
  return 'fake restaurants';
}

async function getRestaurantsByCuisine() {
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
  getRestaurantsByCuisine,
  getRestaurantsByName,
  getRestaurantById,
  updateRestaurant,
  deleteRestaurant
}