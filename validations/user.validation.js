const Joi = require("joi");

const librarianSchema = Joi.object({
  userName: Joi.string().min(3).max(20).required(),
  email: Joi.string().email().required(),
  password: Joi.string().min(8).max(20).required(),
  isActive: Joi.boolean().optional(),
});

const librarianValidate = (req, res, next) => {
  const { error } = librarianSchema.validate(req.body, { abortEarly: false });

  if (error) {
    return res.status(400).json({
      errors: error.details.map((err) => err.message),
    });
  }
  next();
};

module.exports = { librarianValidate };
