const router = require('express').Router();
const {
  getAllUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
  loginUser,
  logoutUser
} = require('../../controllers/user-controllers');

// /api/users/
router.route('/').get(getAllUsers).post(createUser);

// /api/users/:id
router.route('/:id').get(getUserById).put(updateUser).delete(deleteUser);

// /api/users/login
router.route('/login').post(loginUser);

// /api/users/logout
router.route('/logout').post(logoutUser);

module.exports = router;
