// require express route
const route = require('express').Router();
// require admin controller 
const controller = require('../controllers/authController');
// require middleware 
const { Validate } = require('../middleware');
// require validations
const validateAuth = require('../validations/auth');

// route of log in user
route.post('/user/login', [
    validateAuth.userLogin,
    Validate
], controller.loginUser);

// exports route 
module.exports = route;