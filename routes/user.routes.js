const express = require("express");
const authenticateJwt = require("../Passport/passport.middleware");
const authorizeRoles = require("../middlewares/roleAuthorazation.middleware");
const { librarianValidate } = require("../validations/user.validation");
const {
  createLibrarian,
  deleteLibrarian,
} = require("../controllers/user.controllers");

const userRouter = express.Router();

userRouter.post(
  "/",
  authenticateJwt,
  authorizeRoles(["Super Admin"]),
  librarianValidate,
  createLibrarian,
);

userRouter.delete(
  "/:id",
  authenticateJwt,
  authorizeRoles(["Super Admin"]),
  deleteLibrarian,
);

module.exports = userRouter;
