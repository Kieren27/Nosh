require('dotenv').config();
const client = require('../../db/client');

const {
    createPost,
    getAllPosts,
    getPostsByUser,
    getPostsByFriends,
    getPostById,
    updatePost,
    deletePost
} = require('../../db/posts');