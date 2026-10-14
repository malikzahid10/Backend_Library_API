const express = require("express");
const { loginValidate } = require("../validations/auth.validate");
const { loginUser } = require("../controllers/auth.controllers");

const authRouter = express.Router();

authRouter.post("/login", loginValidate, loginUser);

module.exports = authRouter;
