const client = require('./client');

async function createRestaurant() {
  return 'fake restaurant';
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