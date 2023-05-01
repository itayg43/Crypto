const { STATUS_CODE } = require("../../../constants");
const usersService = require("../business-logic/users-service");

async function registerUser(req, res) {
  const { email, password } = req.body;
  const { user, token } = await usersService.registerUser(email, password);
  res.status(STATUS_CODE.SUCCESS.CREATED).header("x-token", token).json(user);
}

async function loginUser(req, res) {
  const { email, password } = req.body;
  const { user, token } = await usersService.loginUser(email, password);
  res.status(STATUS_CODE.SUCCESS.OK).header("x-token", token).json(user);
}

async function authenticateUser(req, res) {
  const { id } = req.user;
  const user = await usersService.authenticateUser(id);
  res.status(STATUS_CODE.SUCCESS.OK).json(user);
}

module.exports = {
  registerUser,
  loginUser,
  authenticateUser,
};
