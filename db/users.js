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
    const {rows: [user] } = await client.query(`
        SELECT * FROM users
        WHERE username = $1;
    `, [username]);

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
    try {
        const { rows: allUsers } = await client.query(`
        SELECT
            id,
            username,
            email,
            "isAdmin",
            created_at
        FROM
            users;
    `)

    console.log('All Users: ', allUsers);
    return allUsers;
    } catch (error) {
        throw new Error(`There was an error while fetching users: ${error}`)
    }
}

async function getUserById(userId) {
    try {
        const { rows: [user] } = await client.query(`
    SELECT * FROM users
    WHERE id=$1
    `, [userId])

    delete user.password;
    console.log("getUserById: ", user);
    return user;
    } catch (error) {
        throw new Error("No users were found with that ID")
    }
}

async function getUserByUsername(username) {
    const { rows: [user] } = await client.query(`
    SELECT *
    FROM users
    WHERE username = $1;
  `, [username]);

  delete user.password;
  console.log("userByUsername: ", user);
  return user;
}

async function getUserByEmail(email) {
    const { rows: [user] } = await client.query(`
    SELECT * FROM users
    WHERE email = $1;
    `, [email]);

    delete user.password;
    console.log("userByEmail: ", user);
    return user;
}

async function updateUser(id, fields = {}) {
    const setString = Object.keys(fields).map(
        (key, index) => `"${key}"=$${index + 1}`
    ).join(', ');

    if (setString.length === 0) {
        return;
    }

    try {
        const { rows: [user] } = await client.query(`
        UPDATE
            users
        SET
            ${setString}
        WHERE
            id=${id}
        RETURNING *;
    `, Object.values(fields));

    delete user.password;
    console.log('updated user: ', user);
    return user;
    } catch (error) {
        throw new Error(`There was an error updating this user ${error}`);
    }
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