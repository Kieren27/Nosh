const client = require('./client');

async function createReview({
  userId,
  restaurantId,
  text,
  rating
}) {
  const {rows: [review]} = await client.query(`
    INSERT INTO reviews("userId", "restaurantId", text, rating)
    VALUES ($1, $2, $3, $4)
    RETURNING *;
  `, [userId, restaurantId, text, rating]);
  console.log('Review:', review);
  return review;
}

async function getAllReviewsByRestaurantId() {
  return 'fake review';
}

async function getAllReviewsByUserId() {
  return 'fake review';
}

async function getReviewById() {
  return 'fake review';
}

async function updateReview() {
  return 'fake review';
}

async function deleteReviewById() {
  return 'fake review';
}

module.exports = {
  createReview,
  deleteReviewById,
  getAllReviewsByRestaurantId,
  getAllReviewsByUserId,
  getReviewById,
  updateReview,
}