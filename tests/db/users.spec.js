
const {
    createUser,
    getAllUsers,
    getUser,
    getUserByUsername,
    getUserById,
    getUserByEmail,
    updateUser,
    deleteUser
} = require('../db/models/users.js')

describe('createUser', () => {
    it('createUser is a function', async () => {
        expect(typeof createUser()).toBe('function')
    })
})

describe('getAllUsers', () => {
    it('getAllUsers is a function', async () => {
        expect(typeof getAllUsers()).toBe('function')
    })
})

describe('getUser', () => {
    it('getUser is a function', async () => {
        expect(typeof getUser()).toBe('function')
    })
})

describe('getUserByUsername', () => {
    it('getUserByUsername is a function', async () => {
        expect(typeof getUserByUsername()).toBe('function')
    })
})

describe('getUserById', () => {
    it('getUserById is a function', async () => {
        expect(typeof getUserById()).toBe('function')
    })
})

describe('getUserByEmail', () => {
    it('getUserByEmail is a function', async () => {
        expect(typeof getUserByEmail()).toBe('function')
    })
})

describe('updateUser', () => {
    it('updateUser is a function', async () => {
        expect(typeof updateUser()).toBe('function')
    })
})

describe('deleteUser', () => {
    it('deleteUser is a function', async () => {
        expect(typeof deleteUser()).toBe('function')
    })
})