const { sequelize, User } = require("../../../db/models");

const { EmailAddressAlreadyInUseError } = require("../errors/users-errors");

const SEQUELIZE_UNIQUE_ERROR = "SequelizeUniqueConstraintError";

async function registerUser(email, password) {
  try {
    return await sequelize.transaction(
      async () =>
        await User.create({
          email,
          password,
        })
    );
  } catch (error) {
    throw error.name === SEQUELIZE_UNIQUE_ERROR
      ? new EmailAddressAlreadyInUseError()
      : error;
  }
}

async function getUserById(id) {
  return await User.findByPk(id);
}

async function getUserByEmail(email) {
  return await User.findOne({
    where: {
      email,
    },
  });
}

module.exports = {
  registerUser,
  getUserById,
  getUserByEmail,
};
