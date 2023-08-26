require('dotenv').config();
const { createRestuarant } = require('../db/restaurants');
const client = require('../db/client');

describe('Database', () => {
  beforeAll(async() => {
    client.connect();
  })
  afterAll(async() => {
    client.end();
  })
})