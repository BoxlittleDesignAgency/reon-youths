const express = require('express');

//import the controllers
const {
  sendMail
} = require('../../controllers/mail');

const router = express.Router();

// @route    post auth/signup
// @desc     Signup
// @access   Public
router.route('/send/mail').post(sendMail);