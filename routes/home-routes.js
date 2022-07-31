const router = require('express').Router();
const {
  renderHomepage,
  renderLogin,
  renderSinglePost
} = require('../controllers/home-controllers');

router.route('/').get(renderHomepage);
router.route('/login').get(renderLogin);
router.route('/post/:id').get(renderSinglePost);

module.exports = router;
