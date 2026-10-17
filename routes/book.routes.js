const express = require("express");
const authenticateJwt = require("../Passport/passport.middleware");
const authorizePermission = require("../middlewares/permissionAuthoraize.middleware");
const { bookValidate } = require("../validations/book.validation");
const { createBook } = require("../controllers/book.controllers");

const bookRouter = express.Router();

bookRouter.post(
  "/",
  authenticateJwt,
  authorizePermission("createBook"),
  bookValidate,
  createBook,
);

module.exports = bookRouter;
