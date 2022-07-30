const router = require('express').Router();
const {
  getAllComments,
  createComment,
  deleteComment
} = require('../../controllers/comment-controllers');
const withAuth = require('../../utils/auth');

// api/comments/
router.route('/').get(getAllComments).post(withAuth, createComment);

// api/comments/:id
router.route('/:id').delete(withAuth, deleteComment);

module.exports = router;
