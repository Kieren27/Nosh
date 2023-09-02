require('dotenv').config();
const { createRestaurant } = require('../db/restaurants');
const client = require('../db/client');

describe('Database', () => {
  beforeAll(async() => {
    client.connect();
  })
  afterAll(async() => {
    client.end();
  })

  describe('createRestuarant', () => {
    it('returns an object', async () => {
      const res = await createRestaurant();
      expect(typeof res === 'object' &&
        !Array.isArray(res) &&
        res !== null).toBe(true);
    })
  })
})