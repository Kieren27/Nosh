require('dotenv').config();
const client = require('../../db/client');

const {
    createUser,
    getUser,
    getAllUsers,
    getUserByUsername,
    getUserById,
    getUserByEmail,
    updateUser,
    deleteUser
} = require('../../db/users.js');

let user;
describe('Database', () => {
    beforeAll(async () => {
        client.connect();
    })
    afterAll(async () => {
        client.end();
    })

    describe('createUser', () => {
        it('returns an object', async () => {
            user = await createUser({
                username: 'OmegaBoringUser',
                password: 'TheMostBoring27',
                email: 'pinnacleofboring@gmail.com'
            });
            expect(typeof user === 'object' &&
                !Array.isArray(user) &&
                user !== null).toBe(true);
        })
        it('returns an object containing all the correct keys', async () => {
            expect(Object.keys(user).sort()).toEqual([
                'username',
                'email',
                'isAdmin',
                'created_at',
                'id'
            ].sort());
        })
        it('does NOT return the user\'s password', async () => {
            expect(user.password).toBeFalsy();
        })
    })

    describe('getUser', () => {
        it('returns an object', async () => {
            const user = await getUser({
                username: 'BoringUser1',
                password: 'ImVeryBoring'
            });
            expect(typeof user === 'object' &&
                !Array.isArray(user) &&
                user !== null).toBe(true);
        })
        it('returns an object containing all the correct keys', async () => {
            expect(Object.keys(user).sort()).toEqual([
                'username',
                'email',
                'isAdmin',
                'created_at',
                'id'
            ].sort());
        })
        it('does NOT return the user\'s password', async () => {
            expect(user.password).toBeFalsy();
        })
    })

    describe('getAllUsers', () => {
        it('returns an array', async () => {
            const AllUsers = await getAllUsers();
            expect(typeof AllUsers === 'object' &&
                Array.isArray(AllUsers) &&
                AllUsers !== null).toBe(true);
        })
        it('returned array contains all user objects (excludes password from client query)', async () => {
            const AllUsers = await getAllUsers();
            const { rows: usersTable } = await client.query(`
            SELECT
            id,
            username,
            email,
            "isAdmin",
            created_at
        FROM
            users;
            `)
            expect(AllUsers).toEqual(usersTable);
        })
    })

    describe('getUserById', () => {
        it('returns an object', async () => {
            const userById = await getUserById(2);
            expect(typeof userById === 'object' &&
                !Array.isArray(userById) &&
                userById !== null).toBe(true);
        })
        it('object contains the correct keys', async () => {
            const userById = await getUserById(2);
            expect(userById).toMatchObject(
                {
                    username: 'BoringUser2',
                    email: 'SuperBoringEmail@gmail.com',
                    isAdmin: expect.anything(),
                    created_at: expect.anything(),
                    id: 2
                }
            )
        })
    })

    describe('getUserByUsername', () => {
        it('returns an object', async () => {
            const userByUsername = await getUserByUsername('BoringUser3');
            expect(typeof userByUsername === 'object' &&
                !Array.isArray(userByUsername) &&
                userByUsername !== null).toBe(true);
        })
        it('object contains the correct keys', async () => {
            const userByUsername = await getUserByUsername('BoringUser3');
            expect(userByUsername).toMatchObject(
                {
                    username: 'BoringUser3',
                    email: 'UltraBoringEmail@gmail.com',
                    isAdmin: expect.anything(),
                    created_at: expect.anything(),
                    id: expect.anything()
                }
            )

        })
    })

    describe('getUserByEmail', () => {
        it('returns an object', async () => {
            const user = await getUserByEmail();
            expect(typeof user === 'object' &&
                !Array.isArray(user) &&
                user !== null).toBe(true);
        })
    })

    describe('updateUser', () => {
        it('returns an object', async () => {
            const user = await updateUser();
            expect(typeof user === 'object' &&
                !Array.isArray(user) &&
                user !== null).toBe(true);
        })
    })

    describe('deleteUser', () => {
        it('returns an object', async () => {
            const user = await deleteUser();
            expect(typeof user === 'object' &&
                !Array.isArray(user) &&
                user !== null).toBe(true);
        })
    })
})