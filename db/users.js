const client = require('./client');
const bcrypt = require('bcrypt');

async function createUser({
    username,
    password,
    email
}) {
    const SALT_COUNT = 10;
    const hashedPassword = await bcrypt.hash(password, SALT_COUNT)

    const { rows: [user] } = await client.query(`
        INSERT INTO users(username, password, email)
        VALUES ($1, $2, $3)
        RETURNING *;
    `, [username, hashedPassword, email]);

    delete user.password;
    console.log("user: ", user);
    return user;
}

async function getUser({username, password}) {
    const user = await getUserByUsername(username);
    const hashedPassword = user.password;
    const isValid = await bcrypt.compare(password, hashedPassword);

    if (isValid) {
        delete user.password;
        console.log("valid user: ", user);
        return user;
    } else {
        throw new Error("Username or password is incorrect");
    }
}

async function getAllUsers() {
    return 'fake users';
}

async function getUserById() {
    return 'fake user';
}

async function getUserByUsername(username) {
    const { rows: [user] } = await client.query(`
    SELECT *
    FROM users
    WHERE username = $1;
  `, [username]);

  return user;
}

async function getUserByEmail() {
    return 'fake user';
}

async function updateUser() {
    return 'fake user';
}

async function deleteUser() {
    return 'fake user';
}

module.exports = {
    createUser,
    getUser,
    getAllUsers,
    getUserById,
    getUserByUsername,
    getUserByEmail,
    updateUser,
    deleteUser
}