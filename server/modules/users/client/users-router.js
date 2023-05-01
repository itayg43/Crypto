const express = require("express");

const usersController = require("./users-controller");
const authenticationMiddleware = require("../../../middlewares/authentication-middleware");

const usersRouter = express.Router();

usersRouter.post("/register", usersController.registerUser);

usersRouter.post("/login", usersController.loginUser);

usersRouter.get(
  "/authenticate",
  authenticationMiddleware,
  usersController.authenticateUser
);

module.exports = usersRouter;
