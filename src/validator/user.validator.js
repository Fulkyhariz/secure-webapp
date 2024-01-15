const {body, query, header} = require("express-validator")

exports.registerValidation = [
    body("username").not().isEmpty().isString(),
    body("password").not().isEmpty().isString(),
    body("firstname").not().isEmpty().isString(),
    body("lastname").isString(),
    body("age").not().isEmpty().isNumeric(),
]