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
    })

    describe('getUserById', () => {
        it('returns an object', async () => {
            const user = await getUserById();
            expect(typeof user === 'object' &&
                !Array.isArray(user) &&
                user !== null).toBe(true);
        })
    })

    describe('getUserByUsername', () => {
        it('returns an object', async () => {
            const user = await getUserByUsername();
            expect(typeof user === 'object' &&
                !Array.isArray(user) &&
                user !== null).toBe(true);
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