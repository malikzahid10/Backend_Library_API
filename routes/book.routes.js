const express = require("express");
const authenticateJwt = require("../Passport/passport.middleware");
const authorizePermission = require("../middlewares/permissionAuthoraize.middleware");
const {
  bookValidate,
  updateBookValidate,
} = require("../validations/book.validation");
const {
  createBook,
  getAllBooks,
  getSingleBook,
  updateBook,
  deleteBook,
} = require("../controllers/book.controllers");

const bookRouter = express.Router();

bookRouter.post(
  "/",
  authenticateJwt,
  authorizePermission("createBook"),
  bookValidate,
  createBook,
);

bookRouter.get(
  "/",
  authenticateJwt,
  authorizePermission("readBook"),
  getAllBooks,
);

bookRouter.get(
  "/:id",
  authenticateJwt,
  authorizePermission("readBook"),
  getSingleBook,
);

bookRouter.put(
  "/:id",
  authenticateJwt,
  authorizePermission("updateBook"),
  updateBookValidate,
  updateBook,
);

bookRouter.delete(
  "/:id",
  authenticateJwt,
  authorizePermission("deleteBook"),
  deleteBook,
);

module.exports = bookRouter;
