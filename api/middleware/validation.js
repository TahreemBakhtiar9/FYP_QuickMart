const { check } = require('express-validator');

exports.signupValidation = [
    check('userName', 'Name is requied').not().isEmpty().withMessage("Name is required").matches(/\d/).withMessage("Name is mandatory"),

    check('email', 'Please include a valid email').isEmail().normalizeEmail({ gmail_remove_dots: true }).withMessage("Email is required").matches(/\d/).withMessage("email is mandatory"),
    check('password', 'Password must be 6 or more characters').isLength({ min: 6 }),
    check('phone', 'Contact number is required').isMobilePhone().not().isEmpty().withMessage("Contact number is required.").matches(/\d/).withMessage("Contact is mandatory"),
    check('Role', 'Add a role').not().isEmpty().withMessage("Role is required").matches(/\d/).withMessage("Role is mandatory")
]

exports.loginValidation = [
    check('email', 'Please include a valid email').isEmail().normalizeEmail({ gmail_remove_dots: true }),
    check('password', 'Password must be 6 or more characters').isLength({ min: 6 }),
    

]