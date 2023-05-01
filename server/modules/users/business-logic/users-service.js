const { User } = require("../../../db/models");
const { InvalidCredentialsError } = require("../errors/users-errors");
const usersDataAccess = require("../data-access/users-data-access");

async function registerUser(email, password) {
  const hashedPassword = await User.hashPassword(password);
  const user = await usersDataAccess.registerUser(email, hashedPassword);
  const token = user.generateToken();
  return {
    user,
    token,
  };
}

async function loginUser(email, password) {
  const user = await usersDataAccess.getUserByEmail(email);

  if (!user) {
    throw new InvalidCredentialsError();
  }

  const isValidPassword = await user.validatePassword(password);
  if (!isValidPassword) {
    throw new InvalidCredentialsError();
  }

  const token = user.generateToken();
  return {
    user,
    token,
  };
}

async function authenticateUser(uid) {
  const user = await usersDataAccess.getUserById(uid);
  return user;
}

module.exports = {
  registerUser,
  loginUser,
  authenticateUser,
};
