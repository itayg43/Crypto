const { STATUS_CODE } = require("../../../constants");

class EmailAddressAlreadyInUseError extends Error {
  constructor() {
    super("Email address already in use.");
    this.statusCode = STATUS_CODE.ERROR.CLIENT.BAD_REQUEST;
  }
}

class InvalidCredentialsError extends Error {
  constructor() {
    super("Invalid credentials.");
    this.statusCode = STATUS_CODE.ERROR.CLIENT.BAD_REQUEST;
  }
}

module.exports = {
  EmailAddressAlreadyInUseError,
  InvalidCredentialsError,
};
