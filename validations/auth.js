// require knex DB 
// require param body from  express validator
const { body, param } = require('express-validator');

// validations user data Register
const userLogin = [ 
    body('email')
        .trim().escape(),
    body('password')
        .trim().escape()
        .notEmpty().withMessage('password not Empty')
        .isAlphanumeric().withMessage('you should contain number and string')
        .isLength({min:8}).withMessage('min Length is 8 char')
];

module.exports = {
    userLogin
}