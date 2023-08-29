const client = require("./client");

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
        date_created DATE NOT NULL,
        "isAdmin" BOOLEAN DEFAULT false
      );

      CREATE TABLE restaurants(
        id SERIAL PRIMARY KEY,
        cuisine VARCHAR(255),
        name VARCHAR(255) NOT NULL,
        price INTEGER NOT NULL CHECK (price > 0 AND price < 4),
        date_created DATE NOT NULL,
        address VARCHAR(255) NOT NULL,
        site_link TEXT
      );

      CREATE TABLE posts(
        id SERIAL PRIMARY KEY,
        "userId" INTEGER REFERENCES users(id),
        "restaurantId" INTEGER REFERENCES restaurants(id),
        date_created DATE NOT NULL,
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
        date_created DATE NOT NULL,
        pending BOOLEAN NOT NULL
      );
    `);
  }
  catch (error) {
    console.error(error);
  }
}

buildTables()
  .catch(console.error)
  .finally(() => client.end());

module.exports = {
  buildTables
}