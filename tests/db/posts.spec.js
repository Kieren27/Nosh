
require("dotenv").config();

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
    });

    it('Creates and returns new activity', async() => {
        const postToCreate = {
            userId: '1',
            restaurantId: '1',
            date_created: '09-02-2023',
            post: 'Went to Applebees today. Truly a phenomenal experience. Make sure to try their mashed potatos!'
        }

        const createdPost = await createPost(postToCreate);
        expect(createdPost.restaurantId).toBe(postToCreate.restaurantId);
        expect(createdPost.post).toBe(postToCreate.post)
    });
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