const Joi = require("joi");

const createMemberSchema = Joi.object({
  firstName: Joi.string().trim().min(2).max(100).required(),
  lastName: Joi.string().trim().min(2).max(100).required(),
  email: Joi.string().email().required(),
  address: Joi.string().allow("").optional(),
  phone: Joi.string().allow("").optional(),
});

const createMemberValidate = (req, res, next) => {
  const { error } = createMemberSchema.validate(req.body, {
    abortEarly: false,
  });

  if (error) {
    return res.status(400).json({
      errors: error.details.map((err) => err.message),
    });
  }

  next();
};

const updateMemberSchema = Joi.object({
  firstName: Joi.string().trim().min(2).max(100),
  lastName: Joi.string().trim().min(2).max(100),
  email: Joi.string().email(),
  address: Joi.string().allow(""),
  phone: Joi.string().allow(""),
  status: Joi.string().valid("active", "inactive"),
}).min(1);

const updateMemberValidate = (req, res, next) => {
  const { error } = updateMemberSchema.validate(req.body, {
    abortEarly: false,
  });

  if (error) {
    return res.status(400).json({
      errors: error.details.map((err) => err.message),
    });
  }

  next();
};

module.exports = { createMemberValidate, updateMemberValidate };
