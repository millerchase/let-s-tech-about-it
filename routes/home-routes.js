const router = require('express').Router();
const {
  renderHomepage,
  renderLogin
} = require('../controllers/home-controllers');

router.route('/').get(renderHomepage);
router.route('/login').get(renderLogin);

module.exports = router;
