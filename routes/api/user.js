const express = require('express');
const router = express.Router();

const {
  requireSignin,
  authenticateUser,
  hasAuthorization,
  isAdmin,
  isAuth
} = require('../../middleware');

const {
  getUsers,
  userById,
  update,
  getUserById,
  updateUser,
  deleteUser
} = require('../../controllers/user');

// @route    GET api/users
// @desc     Tests users route
// @access   Public
router.route('/users').get(getUsers);

// @route    GET api/user/:userId
// @desc     Get a single user
// @access   Private
router
  .route('/user/:userId')
  .get(authenticateUser, isAdmin, getUserById)
  .put(requireSignin, isAdmin, updateUser)
  .delete(requireSignin, deleteUser);

// @route    PUT api/user/update
// @desc     Update a single user
// @access   Private
router.route('/user/update').put(requireSignin, update);

router.route('/secret/:userId').get(requireSignin, (req, res) => {
  res.json({
    user: req.profile
  });
});

// @route param
// @desc  any route containing :userId, our aoo will execute userById();
// @access Private
// router.param('userId', userById);

module.exports = router;
