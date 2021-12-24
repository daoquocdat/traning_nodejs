const express = require('express');
const router = express.Router();
const userActivityController = require('../controllers/UserActivityController');
const {requireAuth} = require('../../src/middlewares/authMiddlewares');
const {checkAccount} = require('../../src/middlewares/authMiddlewares');

router.get('/:id/activity',requireAuth, userActivityController.activity);


module.exports = router;