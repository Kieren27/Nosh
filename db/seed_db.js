const client = require("./client");
const {
  createRestaurant
} = require('./restaurants');

async function buildTables() {
  try {
    client.connect();

    await client.query(`
      DROP TABLE IF EXISTS comments;
      DROP TABLE IF EXISTS friends;
      DROP TABLE IF EXISTS reviews;
      DROP TABLE IF EXISTS posts;
      DROP TABLE IF EXISTS users;
      DROP TABLE IF EXISTS restaurants;
    `);

    await client.query(`
      CREATE TABLE users(
        id SERIAL PRIMARY KEY,
        username VARCHAR(255) UNIQUE NOT NULL,
        password VARCHAR(255) NOT NULL,
        email VARCHAR(255) UNIQUE NOT NULL,
        created_at timestamptz NOT NULL DEFAULT now(),
        "isAdmin" BOOLEAN DEFAULT false
      );

      CREATE TABLE restaurants(
        id SERIAL PRIMARY KEY,
        cuisine VARCHAR(255),
        name VARCHAR(255) NOT NULL,
        price INTEGER NOT NULL CHECK (price > 0 AND price < 4),
        created_at timestamptz NOT NULL DEFAULT now(),
        address VARCHAR(255) NOT NULL,
        site_link TEXT
      );

      CREATE TABLE posts(
        id SERIAL PRIMARY KEY,
        "userId" INTEGER REFERENCES users(id),
        "restaurantId" INTEGER REFERENCES restaurants(id),
        created_at timestamptz NOT NULL DEFAULT now(),
        post TEXT NOT NULL
      );

      CREATE TABLE reviews(
        id SERIAL PRIMARY KEY,
        "userId" INTEGER REFERENCES users(id),
        "restaurantId" INTEGER REFERENCES restaurants(id),
        review TEXT NOT NULL,
        rating INTEGER NOT NULL CHECK (rating > 0 AND rating < 6),
        date_created DATE NOT NULL
      );

      CREATE TABLE comments(
        id SERIAL PRIMARY KEY,
        "postId" INTEGER REFERENCES posts(id),
        "userId" INTEGER REFERENCES users(id),
        comment TEXT NOT NULL,
        date_created DATE NOT NULL
      );

      CREATE TABLE friends(
        id SERIAL PRIMARY KEY,
        "userId1" INTEGER REFERENCES users(id),
        "userId2" INTEGER REFERENCES users(id),
        created_at timestamptz NOT NULL DEFAULT now(),
        pending BOOLEAN NOT NULL
      );
    `);
  }
  catch (error) {
    console.error(error);
  }
}

async function createInitialRestaurants() {
  console.log('Starting to create restaurants...');
  await createRestaurant({
    cuisine: 'Fast Food',
    name: 'Taco Bell',
    price: '1',
    address: '1345 Random St'
  });
  await createRestaurant({
    cuisine: 'Italian',
    name: "Ca'bianca Ristorante Italiano",
    price: '3',
    address: '835 Second St'
  });
  await createRestaurant({
    cuisine: 'Fast Food',
    name: "Burger King",
    price: '1',
    address: '1008 Fast Food Ln'
  });
}

// commented out to solve multiple client connect error during tests
// buildTables()
//   .catch(console.error)
//   .finally(() => client.end());

module.exports = {
  buildTables,
  createInitialRestaurants
}