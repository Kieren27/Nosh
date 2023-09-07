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

describe('Database', () => {
    beforeAll(async() => {
      client.connect();
    })
    afterAll(async() => {
      client.end();
    })

    describe('createUser', () => {
        it('returns an object', async () => {
            const res = await createUser();
            expect(typeof res).toBe('object');
        })
    })

    describe('getUser', () => {
        it('returns an object', async () => {
            const res = await getUser();
            expect(typeof res).toBe('object');
        })
    })

    describe('getAllUsers', () => {
        it('returns an array', async () => {
            const res = await getAllUsers();
            expect(typeof res).toBe('array');
        })
    })

    describe('getUserById', () => {
        it('returns an object', async () => {
            const res = await getUserById();
            expect(typeof res).toBe('object');
        })
    })

    describe('getUserByUsername', () => {
        it('returns an object', async () => {
            const res = await getUserByUsername();
            expect(typeof res).toBe('object');
        })
    })

    describe('getUserByEmail', () => {
        it('returns an object', async () => {
            const res = await getUserByEmail();
            expect(typeof res).toBe('object');
        })
    })

    describe('updateUser', () => {
        it('returns an object', async () => {
            const res = await updateUser();
            expect(typeof res).toBe('object');
        })
    })

    describe('deleteUser', () => {
        it('returns an object', async () => {
            const res = await deleteUser();
            expect(typeof res).toBe('object');
        })
    })
})