const Joi = require("joi");

const loginValidateSchema = Joi.object({
  email: Joi.string().email().required().messages({
    "string.email": "Please Enter a Valid Email Address",
    "any.required": "Email is Required",
    "string.empty": "Email can not be Empty",
  }),

  password: Joi.string().min(8).max(20).required().messages({
    "string.min": "Password must be at least 8 charactors long",
    "string.max": "Password length is big , Please Enter Maximum 20 Charactors",
    "any.required": " Password is Required",
    "string.empty": "Password can not be Empty",
  }),
});

const loginValidate = (req, res, next) => {
  const { error } = loginValidateSchema.validate(req.body, {
    abortEarly: false,
  });
  if (error) {
    return res.status(400).json({
      errors: error.details.map((err) => err.message),
    });
  }
  next();
};

module.exports = {
  loginValidate,
};
