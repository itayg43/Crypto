const express = require("express");

const usersController = require("./users-controller");
const validateUserAuthenticationMiddleware = require("../../../middlewares/user-authentication-validation-middleware");

const usersRouter = express.Router();

usersRouter.post("/register", usersController.registerUser);

usersRouter.post("/login", usersController.loginUser);

usersRouter.get(
  "/authenticate",
  validateUserAuthenticationMiddleware,
  usersController.authenticateUser
);

module.exports = usersRouter;
