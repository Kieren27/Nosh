const client = require("./client");
const {
  createUser
} = require ('./users');

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

async function createInitialUsers() {
  console.log('Starting to create users...');
  await createUser({
    username: 'BoringUser1',
    password: 'ImVeryBoring',
    email: 'BoringEmail@gmail.com',
    isAdmin: false
  });
  await createUser({
    username: 'BoringUser2',
    password: 'ImSuperBoring',
    email: 'SuperBoringEmail@gmail.com',
    isAdmin: false
  });
  await createUser({
    username: 'BoringUser3',
    password: 'ImUltraBoring',
    email: 'UltraBoringEmail@gmail.com',
    isAdmin: false
  });
  console.log('Finished creating users!');
}

// commented out to solve multiple client connect error during tests
// buildTables()
//   .catch(console.error)
//   .finally(() => client.end());

module.exports = {
  buildTables,
  createInitialUsers
}