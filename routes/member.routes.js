const express = require("express");
const authenticateJwt = require("../Passport/passport.middleware");
const authorizePermission = require("../middlewares/permissionAuthoraize.middleware");
const {
  createMemberValidate,
  updateMemberValidate,
} = require("../validations/member.validation");
const {
  createMember,
  getAllMembers,
  getSingleMember,
  updateMember,
  deleteMember,
} = require("../controllers/member.controllers");

const memberRouter = express.Router();

memberRouter.post(
  "/",
  authenticateJwt,
  authorizePermission("manageMembers"),
  createMemberValidate,
  createMember,
);

memberRouter.get(
  "/",
  authenticateJwt,
  authorizePermission("manageMembers"),
  getAllMembers,
);

memberRouter.get(
  "/:id",
  authenticateJwt,
  authorizePermission("manageMembers"),
  getSingleMember,
);

memberRouter.put(
  "/:id",
  authenticateJwt,
  authorizePermission("manageMembers"),
  updateMemberValidate,
  updateMember,
);

memberRouter.delete(
  "/:id",
  authenticateJwt,
  authorizePermission("manageMembers"),
  deleteMember,
);

module.exports = memberRouter;
