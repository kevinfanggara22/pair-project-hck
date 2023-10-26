const express = require('express');
const router = express.Router();
const UserController = require('../controllers/UserController')
const AdminController = require('../controllers/AdminController')

// Global middleware
router.use(function(req, res, next){
    console.log(req.session)
    console.log('Time:', Date.now())
    next()
}) 

// Landing Page
router.get('/', UserController.landingPage)

// User Registration
router.get('/register', UserController.registerForm);
router.post('/register', UserController.postRegister);

// User Login
router.get('/login', UserController.loginForm);
router.post('/login', UserController.postLogin);

// Admin Dashboard
router.get('/admin', AdminController.adminDashboard);

// User create Profile
router.get('/')

// User delete Post

module.exports = router;
