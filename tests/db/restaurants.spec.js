require('dotenv').config();
const { 
  createRestaurant,
  getAllRestaurants, 
  getRestaurantsByCategory,
  getRestaurantsByName,
  getRestaurantById,
  updateRestaurant,
  deleteRestaurant
} = require('../../db/restaurants');
const client = require('../../db/client');

describe('Database', () => {
  beforeAll(async() => {
    client.connect();
  })
  afterAll(async() => {
    client.end();
  })

  describe('createRestaurant', () => {
    it('returns an object', async () => {
      const res = await createRestaurant({
        name: 'Pizza Hut',
        cuisine: 'American',
        price: 1,
        address: '123 Smith St'
      });
      expect(typeof res === 'object' &&
        !Array.isArray(res) &&
        res !== null).toBe(true);
    })
  })

  describe('getAllRestaurants', () => {
    it('returns an array', async () => {
      const allRes = await getAllRestaurants();
      expect(Array.isArray(allRes)).toBe(true);
    })
  })

  describe('getRestaurantsByCategory', () => {
    it('returns an array', async () => {
      const resByCat = await getRestaurantsByCategory('American');
      expect(Array.isArray(resByCat)).toBe(true);
    })
  })

  describe('getRestaurantsByName', () => {
    it('returns an array', async () => {
      const resByName = await getRestaurantsByName('Pizza Hut');
      expect(Array.isArray(resByName)).toBe(true);
    })
  })

  describe('getRestaurantById', () => {
    it('returns an object', async () => {
      const resById = await getRestaurantById(1);
      expect(typeof resById === 'object' &&
        !Array.isArray(resById) &&
        resById !== null).toBe(true);
    })
  })

  describe('updateRestaurant', () => {
    it('returns an object', async () => {
      const updatedRes = await updateRestaurant({
        id: 1,
        name: 'The Pizza Hut'
      });
      expect(typeof updatedRes === 'object' &&
        !Array.isArray(updatedRes) &&
        updatedRes !== null).toBe(true);
    })
  })

  describe('deleteRestaurant', () => {
    it('returns an object', async () => {
      const deletedRes = await deleteRestaurant(1);
      expect(typeof deletedRes === 'object' &&
        !Array.isArray(deletedRes) &&
        deletedRes !== null).toBe(true);
    })
  })
})