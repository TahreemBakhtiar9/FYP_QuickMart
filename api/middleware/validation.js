const { check } = require('express-validator');
 
exports.signupValidation = [
    check('userName', 'Name is requied').not().isEmpty(),
    check('email', 'Please include a valid email').isEmail().normalizeEmail({ gmail_remove_dots: true }),
    check('password', 'Password must be 6 or more characters').isLength({ min: 6 }),
    check('phone', 'Contact number is required').isMobilePhone().notEmpty(true),
    check('Role', 'Add a role').not().isEmpty()
]
 
exports.loginValidation = [
     check('email', 'Please include a valid email').isEmail().normalizeEmail({ gmail_remove_dots: true }),
     check('password', 'Password must be 6 or more characters').isLength({ min: 6 })
 
]