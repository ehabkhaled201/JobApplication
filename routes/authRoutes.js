
const route = require('express').Router();

const controller = require('../controllers/authController');

const { Validate } = require('../middleware');

const validateAuth = require('../validations/auth');


route.post('/user/login', [
    validateAuth.userLogin,
    Validate
], controller.loginUser);


module.exports = route;