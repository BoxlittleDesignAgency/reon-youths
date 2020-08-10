const express = require('express');

//import the controllers
const {
  signUp,
  signIn,
  signOut,
  forgotPassword,
  resetPassword,
  currentUser
} = require('../../controllers/auth');

//import the middlewares
const { authenticateUser, requireSignin } = require('../../middleware');

const {
  check,
  body,
  matchedData,
  validationResult
} = require('express-validator');

const {
  signupValidate,
  signinValidate,
  forgotPasswordValidator,
  resetPasswordValidator
} = require('../../validator/auth');

//import validator
const { runValidation } = require('../../validator/index');

const router = express.Router();

// @route    post auth/signup
// @desc     Signup
// @access   Public
router.route('/auth/signup').post(signupValidate, runValidation, signUp);

// @route    post auth/signin
// @desc     Signin
// @access   Public
router.route('/auth/signin').post(signinValidate, runValidation, signIn);

// @route    post auth/signout
// @desc     Signup
// @access   Public
router.route('/auth/signout').get(signOut);
router.route('/auth/current').get(authenticateUser, currentUser);

//forgot reset password
router
  .route('/auth/forgot-password')
  .put(forgotPasswordValidator, runValidation, forgotPassword);

router
  .route('/auth/reset-password')
  .put(resetPasswordValidator, runValidation, resetPassword);

module.exports = router;
