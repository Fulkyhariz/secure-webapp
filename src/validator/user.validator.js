const {body, query, header, validationResult} = require("express-validator")

const registerValidation = () => {
    return [
        body("username").not().isEmpty().isString(),
        body("password").not().isEmpty().isString(),
        body("firstname").not().isEmpty().isString(),
        body("lastname").isString(),
        body("age").not().isEmpty().isNumeric(),
    ]
} 

const loginValidation = () => {
    return [
        body("username").not().isEmpty().isString(),
        body("password").not().isEmpty().isString()
    ]
} 

const validate = (req, res, next) => {
  const errors = validationResult(req)
  if (errors.isEmpty()) {
    return next()
  }
  const extractedErrors = {}
  errors.array().map(err => extractedErrors[err.path]= err.msg )
  console.error(errors)
  return res.status(422).json({
    errors: extractedErrors,
  })
}

module.exports = {
  registerValidation,
  loginValidation,
  validate,
}