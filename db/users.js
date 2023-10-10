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

async function getUser() {
    return 'fakest user';
}

async function getAllUsers() {
    return 'fake users';
}

async function getUserById() {
    return 'fake user';
}

async function getUserByUsername() {
    return 'fake user';
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