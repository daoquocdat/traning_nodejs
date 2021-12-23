const express = require('express')
const router = express.Router() 
const userController = require('../controllers/UserController')
const {requireAuth} = require('../../src/middlewares/authMiddlewares')

router.get('/',requireAuth, userController.view)
router.post('/register', userController.register)
router.post('/login',requireAuth, userController.login)
router.get('/logout',requireAuth, userController.logout)

module.exports = router