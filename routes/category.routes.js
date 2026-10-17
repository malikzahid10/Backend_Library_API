const express = require("express");
const authenticateJwt = require("../Passport/passport.middleware");
const authorizePermission = require("../middlewares/permissionAuthoraize.middleware");
const {
  createCategoryValidate,
  updateCategoryValidate,
} = require("../validations/category.validation");
const {
  createCategory,
  getAllCategory,
  getSingleCategory,
  updateCategory,
  deleteCategory,
} = require("../controllers/category.controllers");

const categoryRouter = express.Router();

categoryRouter.post(
  "/",
  authenticateJwt,
  authorizePermission("createCategory"),
  createCategoryValidate,
  createCategory,
);

categoryRouter.get(
  "/",
  authenticateJwt,
  authorizePermission("readCategory"),
  getAllCategory,
);

categoryRouter.get(
  "/:id",
  authenticateJwt,
  authorizePermission("readCategory"),
  getSingleCategory,
);

categoryRouter.put(
  "/:id",
  authenticateJwt,
  authorizePermission("updateCategory"),
  updateCategoryValidate,
  updateCategory,
);

categoryRouter.delete(
  "/:id",
  authenticateJwt,
  authorizePermission("deleteCategory"),
  deleteCategory,
);

module.exports = categoryRouter;
