const express = require('express');
const router = express.Router();

//import the controllers
const { getSiteData, updateSiteData } = require('../../controllers/site');

//import the middlewares
const { authenticateUser, isAdmin } = require('../../middleware');

// @route    post site/site_data
// @desc     get and update site data
// @access   Private
router
  .route('/site/site_data')
  .get(getSiteData)
  .post(authenticateUser, isAdmin, updateSiteData);

module.exports = router;
