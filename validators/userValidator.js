const { body, param } = require("express-validator");

exports.registerValidation =[
    body("name").notEmpty().withMessage("Name is required"),
    body("email").isEmail().withMessage("Invalid email format"),
    body("password").isLength({min:6}).withMessage("Password must be at least 6 characters")

];

exports.loginValidation = [
    body("email").isEmail().withMessage("Email is invalid"),
    body("password").notEmpty().withMessage("Passward is required"),  
];

exports.userIdValidation = [
    param("id").isMongoId().withMessage("Invalid user ID")
];