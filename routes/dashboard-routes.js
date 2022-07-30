const router = require('express').Router();
const {
  getAllPosts,
  getSinglePost
} = require('../controllers/dashboard-controllers');
const withAuth = require('../utils/auth');

router.route('/').get(withAuth, getAllPosts);
router.route('/edit/:id').get(withAuth, getSinglePost);

module.exports = router;
