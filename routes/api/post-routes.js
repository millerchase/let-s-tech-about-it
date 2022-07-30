const router = require('express').Router();
const {
  getAllPosts,
  getSinglePost,
  addPost,
  updatePost,
  deletePost
} = require('../../controllers/post-controllers');
const withAuth = require('../../utils/auth');

// api/posts/
router.route('/').get(getAllPosts).post(withAuth, addPost);

// api/posts/:id
router
  .route('/:id')
  .get(getSinglePost)
  .put(withAuth, updatePost)
  .delete(withAuth, deletePost);

module.exports = router;
