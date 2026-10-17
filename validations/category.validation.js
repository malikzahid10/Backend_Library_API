const Joi = require("joi");

const createCategorySchema = Joi.object({
  name: Joi.string().trim().min(2).max(100).required(),

  description: Joi.string().allow("").optional(),
});

const createCategoryValidate = (req, res, next) => {
  const { error } = createCategorySchema.validate(req.body, {
    abortEarly: false,
  });

  if (error) {
    return res.status(400).json({
      errors: error.details.map((err) => err.message),
    });
  }

  next();
};

const updateCategorySchema = Joi.object({
  name: Joi.string().trim().min(2).max(100).optional(),

  description: Joi.string().allow("").optional(),
});

const updateCategoryValidate = (req, res, next) => {
  const { error } = updateCategorySchema.validate(req.body, {
    abortEarly: false,
  });

  if (error) {
    return res.status(400).json({
      errors: error.details.map((err) => err.message),
    });
  }

  next();
};

module.exports = { createCategoryValidate, updateCategoryValidate };
