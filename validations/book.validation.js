const Joi = require("joi");

const bookSchema = Joi.object({
  title: Joi.string().trim().min(2).max(150).required(),

  author: Joi.string().trim().min(2).max(100).required(),

  isbn: Joi.string().trim().required(),

  description: Joi.string().allow("").optional(),

  publisher: Joi.string().trim().allow("").optional(),

  publishedYear: Joi.number().integer().min(1000).max(2100).optional(),

  price: Joi.number().min(0).optional(),

  totalCopies: Joi.number().integer().min(1).optional(),

  availableCopies: Joi.number().integer().min(0).optional(),

  categoryId: Joi.number().integer().positive().required(),
});

const bookValidate = (req, res, next) => {
  const { error } = bookSchema.validate(req.body, { abortEarly: false });

  if (error) {
    return res.status(400).json({
      errors: error.details.map((err) => err.message),
    });
  }
  next();
};

const updateBookSchema = Joi.object({
  title: Joi.string().trim().min(2).max(150).optional(),

  author: Joi.string().trim().min(2).max(100).optional(),

  description: Joi.string().allow("").optional(),

  publisher: Joi.string().trim().allow("").optional(),

  publishedYear: Joi.number().integer().min(1000).max(2100).optional(),

  price: Joi.number().min(0).optional(),

  totalCopies: Joi.number().integer().min(1).optional(),

  availableCopies: Joi.number().integer().min(0).optional(),
});

const updateBookValidate = (req, res, next) => {
  const { error } = updateBookSchema.validate(req.body, { abortEarly: false });

  if (error) {
    return res.status(400).json({
      errors: error.details.map((err) => err.message),
    });
  }
  next();
};

module.exports = {
  bookValidate,
  updateBookValidate,
};
