
const client = require('../../db/client');

const {
    createPost,
    getAllPosts,
    getPostsByFriends,
    getPostsByRestaurant,
    getPostById,
    updatePost,
    deletePost
} = require('../../db')

describe('createPost', () => {
    it('is a function', () => {
        expect(typeof createPost()).toBe('function')
    })
})

describe('getAllPosts', () => {
    it('is a function', () => {
        expect(typeof getAllPosts()).toBe('function')
    })
})

describe('getPostsByFriends', () => {
    it('is a function', () => {
        expect(typeof getPostsByFriends()).toBe('function')
    })
})

describe('getPostsByRestaurant', () => {
    it('is a function', () => {
        expect(typeof getPostsByRestaurant()).toBe('function')
    })
})

describe('getPostById', () => {
    it('is a function', () => {
        expect(typeof getPostById()).toBe('function')
    })
})

describe('updatePost', () => {
    it('is a function', () => {
        expect(typeof updatePost()).toBe('function')
    })
})

describe('deletePost', () => {
    it('is a function', () => {
        expect(typeof deletePost()).toBe('function')
    })
})