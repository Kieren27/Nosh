require('dotenv').config();
const { 
  createRestaurant,
  getAllRestaurants, 
  getRestaurantsByCuisine,
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
      WHERE address=$1;
    `, ['123 Smith St']);
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

  describe('getRestaurantsByCuisine', () => {
    it('returns an array containing restaurants by cuisine', async () => {
      const resByCat = await getRestaurantsByCuisine('Fast Food');
      expect(resByCat).toEqual([
        {
          cuisine: 'Fast Food',
          name: 'Taco Bell',
          price: '1',
          address: '1345 Random St',
          id: expect.anything(),
          created_at: expect.anything(),
          site_link: null
        },
        {
          cuisine: 'Fast Food',
          name: "Burger King",
          price: '1',
          address: '1008 Fast Food Ln',
          id: expect.anything(),
          created_at: expect.anything(),
          site_link: null
        }
      ]);
    })

  })

  describe('getRestaurantsByName', () => {
    it('returns an array containing restaurants by name', async () => {
      const resByName = await getRestaurantsByName('Pizza Hut =)');
      expect(resByName).toEqual([
        {
          name: 'Pizza Hut =)',
          cuisine: 'American',
          price: 1,
          address: '123 Smith St',
          id: expect.anything(),
          created_at: expect.anything(),
          site_link: null
        }
      ]);
    })
  })

  describe('getRestaurantById', () => {
    it('returns a restaurant object with the correct id', async () => {
      const resById = await getRestaurantById(1);
      expect(resById).toMatchObject(
        {
          cuisine: 'Fast Food',
          name: 'Taco Bell',
          price: '1',
          address: '1345 Random St',
          id: 1,
          created_at: expect.anything(),
          site_link: null
        }
      );
    })
  })

  describe('updateRestaurant', () => {
    it('returns an object', async () => {
      const updatedRes = await updateRestaurant({
        id: 1,
        name: 'The New Pizza Hut =)'
      });
      expect(updatedRes).toMatchObject({
        name: 'The New Pizza Hut =)',
        cuisine: 'American',
        price: 1,
        address: '123 Smith St',
        id: expect.anything(),
        created_at: expect.anything(),
        site_link: null
      });
    })
  })

  describe('deleteRestaurant', () => {
    it('returns the deleted restaurant', async () => {
      const deletedRes = await deleteRestaurant(1);
      expect(deletedRes).toMatchObject({
        name: expect.anything(),
        cuisine: 'American',
        price: 1,
        address: '123 Smith St',
        id: 1,
        created_at: expect.anything(),
        site_link: null
      });
    })
    it('removed the restaurant from the table', async () => {
      const {rows: [restaurant]} = await client.query(`
        SELECT * FROM restaurants
        WHERE address=$1;
      `, ['123 Smith St']);
      expect(restaurant).toBe(undefined);
    });
  })
})