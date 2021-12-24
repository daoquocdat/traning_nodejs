const express = require('express');
const router = express.Router(); 
const userController = require('../controllers/UserController');
//middlewares
const response = require('../middlewares/responseMiddlewares');
const {requireAuth} = require('../../src/middlewares/authMiddlewares');
const {checkAccount} = require('../../src/middlewares/authMiddlewares');
//router
router.get('/',requireAuth, userController.view,response.checkStatus);
router.post('/register', userController.register,response.checkStatus);
router.post('/login',requireAuth, userController.login,response.checkStatus);
router.get('/logout',requireAuth,checkAccount, userController.logout,response.checkStatus);

module.exports = router;