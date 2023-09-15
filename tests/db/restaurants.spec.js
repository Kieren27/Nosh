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

let res;
describe('Database', () => {
  beforeAll(async() => {
    client.connect();
    res = await createRestaurant({
      name: 'Pizza Hut =)',
      cuisine: 'American',
      price: 1,
      address: '123 Smith St'
    });
  })
  afterAll(async() => {
    await client.query(`
      DELETE FROM restaurants 
      WHERE name=$1;
    `, ['Pizza Hut =)']);
    client.end();
  })

  describe('createRestaurant', () => {
    it('returns an object', async () => {
      expect(typeof res === 'object' &&
        !Array.isArray(res) &&
        res !== null).toBe(true);
    })
    it('returns an object containing all the correct keys', async () => {
      expect(Object.keys(res).sort()).toEqual([
        'name',
        'cuisine',
        'price',
        'address',
        'created_at',
        'id',
        'site_link'
      ].sort());
    })
    it('returns the correct object', async () => {
      expect(res).toMatchObject({
        name: 'Pizza Hut =)',
        cuisine: 'American',
        price: 1,
        address: '123 Smith St',
        id: expect.anything(),
        created_at: expect.anything(),
        site_link: null
      });
    })
    it('added the object to the restaurants table', async () => {
      const name = "Pizza Hut =)";
      const {rows: [restaurant]} = await client.query(`
        SELECT * FROM restaurants
        WHERE name=$1;
      `, [name]);
      expect({
        name: 'Pizza Hut =)',
        cuisine: 'American',
        price: 1,
        address: '123 Smith St',
        id: expect.anything(),
        created_at: expect.anything(),
        site_link: null
      }).toMatchObject(restaurant);
    });
  })

  describe('getAllRestaurants', () => {
    it('returns an array of all restaurants', async () => {
      const allRes = await getAllRestaurants();
      const { rows: resFromDB } = await client.query(`
        SELECT * FROM restaurants;
      `)
      expect(allRes).toEqual(resFromDB);
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
      const resByName = await getRestaurantsByName('Pizza Hut =)');
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
        name: 'The Pizza Hut =)'
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