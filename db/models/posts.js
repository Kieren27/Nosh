
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
    try {
        const{rows: allPosts} = await client.query(
            `
            SELECT *
            FROM posts;
            `
        )
        return allPosts;

    } catch(error){
        console.log(error)
    }
}

async function getPostsByUser(userId){
    try {
        const {rows: userPosts} = await client.query(`
        SELECT *
        FROM posts
        WHERE "userId"=$1;`, [userId])

        return userPosts;
    } catch(error){
        console.log(error)
    }
}

async function getPostsByFriends(userId){
    try {
        const {rows: friends } = await client.query(`
        SELECT *
        FROM friends
        WHERE ("userId1"=$1 OR "userId2"=$2) AND pending=0;
        `, [userId])

        let friendPosts = [];

        
        friends.map(friend => {
            let myFriend;
            if(friend.userId1 === userId){
                myFriend = friend.userId2
            } else if (friend.userId2 === userId){
                myFriend = friend.userId1
            }

            posts = getPostsByUser(myFriend)

            for (let i = 0; i < posts.length; i++){
                friendPosts.push(posts)
            }
        })

        return friendPosts;
    } catch(error){
        console.log(error)
    }
    
}

async function getPostsByRestaurant(restaurantId){
    try{
        const {rows:posts} = await client.query(`
        SELECT *
        FROM posts
        WHERE "restaurantId"=$1;
        `, [restaurantId])

        return posts;
    } catch(error){
        console.log(error)
    }
}

async function getPostById(id){
    try{

        const {rows: {post}} = await client.query(`
        SELECT *
        FROM posts
        WHERE id=$1;
        `,[id])

        return post;

    } catch (error){
        console.log(error)
    }
}


async function updatePost({id, ...fields}){
    const setString = Object.keys(fields)
    .map((key, idx) => `${key} = $${idx + 1}`)
    .join(", ");

    if (setString.length === 0){
        return;
    }

    try {
        const {rows: [post]} = await client.query(`
        UPDATE posts
        SET ${setString}
        WHERE id=$1
        RETURNING *;
        `, [id, ...Object.values(fields)]);

        return post;
    } catch (error){
        console.error(error);
    }
}

async function deletePost(postId){
    try {

        const {rows: [response]} = await client.query(`
        DELETE posts
        WHERE id=$1
        RETURNING *;
        `, [postId])

        return response;

    } catch(error){
        console.log(error)
    }
}




module.exports = {
    createPost,
    getAllPosts,
    getPostsByFriends,
    getPostsByUser,
    getPostsByRestaurant,
    getPostById,
    updatePost,
    deletePost
}