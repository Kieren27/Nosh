
const client = require('../client');

async function createPost({userId, restaurantId, post}){
    let date = new Date()
    date = date.toString().split(' ')
    date = date.slice(1,4).join(' ')
    
   try {
        const {rows : [posts]} = await client.query(`
        INSERT INTO posts('userId', 'restaurantId', post, date_created)
        VALUES ($1, $2, $3, $4)
        RETURNING *;
        `, [userId, restaurantId, post, date])
   } catch (error){
        console.log(error)
   }
}

async function getAllPosts(){
    return ''
}

async function getPostsByFriends(){
    return ''
}

async function getPostsByRestaurant(){
    return ''
}

async function getPostById(){
    return ''
}

async function updatePost(){
    return ''
}

async function deletePost(){
    return ''
}




module.exports = {
    createPost,
    getAllPosts,
    getPostsByFriends,
    getPostsByRestaurant,
    getPostById,
    updatePost,
    deletePost
}