require('dotenv').config();
const { createRestaurant } = require('../../db/restaurants');
const client = require('../../db/client');

describe('Database', () => {
  beforeAll(async() => {
    client.connect();
  })
  afterAll(async() => {
    client.end();
  })
})