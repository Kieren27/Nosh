require('dotenv').config();
const { 
  createReview,
  deleteReviewById,
  getAllReviewsByRestaurantId,
  getAllReviewsByUserId,
  getReviewById,
  updateReview
} = require('../../db/reviews');
const client = require('../../db/client');

let newReview;
describe('Database', () => {
  beforeAll(async() => {
    client.connect();
    newReview = await createReview({
      text: 'This is a fake review.',
      restaurantId: 1,
      userId: 1,
      rating: 4
    });
  });
  afterAll(async() => {
    await client.query(`
      DELETE FROM reviews
      WHERE text=$1;
    `, ['This is a fake review.']);
    client.end();
  });


  describe('createReview', () => {
    it('returns the correct review object', async () => {
      expect(newReview).toMatchObject({
        text: 'This is a fake review.',
        restaurantId: 1,
        userId: 1,
        rating: 4,
        id: expect.anything(),
        created_at: expect.anything()
      });
    })
    it('added the review to the reviews table', async () => {
      const {rows: [review]} = await client.query(`
        SELECT * FROM reviews
        WHERE text=$1;
      `, ['This is a fake review.']);
      expect(review).toMatchObject({
        text: 'This is a fake review.',
        restaurantId: 1,
        userId: 1,
        rating: 4,
        id: expect.anything(),
        created_at: expect.anything()
      });
    });
  });

  describe('getAllReviewsByRestaurantId', () => {
    it('returns an array of all reviews for a restaurant', async () => {
      const allReviews = await getAllReviewsByRestaurantId(1);
      const { rows: testReviews } = await client.query(`
        SELECT * FROM reviews
        WHERE "restaurantId"=$1;
      `, [1]);
      expect(allReviews).toEqual(testReviews);
    });
  });

  describe('getAllReviewsByUserId', () => {
    it('returns an array of all reviews made by a user', async () => {
      const allReviews = await getAllReviewsByUserId(1);
      const { rows: testReviews } = await client.query(`
        SELECT * FROM reviews
        WHERE "userId"=$1;
      `, [1]);
      expect(allReviews).toEqual(testReviews);
    });
  });

  describe('getReviewById', () => {
    it('returns the review with the given ID', async () => {
      const testReview = await getReviewById(4);
      expect(newReview).toMatchObject(testReview);
    });
  });

  describe('updateReview', () => {
    it('Updates the specified review and returns the updated object', async () => {
      const updatedRev = await updateReview({
        id: 4,
        text: 'This is a fake review.',
        rating: 3
      })
      expect(updatedRev).toMatchObject({
        text: 'This is a fake review.',
        restaurantId: 1,
        userId: 1,
        rating: 3,
        id: 4,
        created_at: expect.anything()
      })
    })
  })

  describe('deleteReviewById', () => {
    it('returns the deleted review', async () => {
      const deletedReview = await deleteReviewById(4);
      expect(deletedReview).toMatchObject(
        {
          text: 'This is a fake review.',
          restaurantId: 1,
          userId: 1,
          rating: 3,
          id: 4,
          created_at: expect.anything()
        }
      );
    });
    it('removed the review from the table', async () => {
      const {rows: [review]} = await client.query(`
        SELECT * FROM reviews
        WHERE text=$1;
      `, ['This is a fake review.']);
      expect(review).toBe(undefined);
    });
  });
});