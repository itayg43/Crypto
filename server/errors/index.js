const { STATUS_CODE } = require("../constants");

class NoTokenProvidedError extends Error {
  constructor() {
    super("Access denied, no token provided.");
    this.statusCode = STATUS_CODE.ERROR.CLIENT.UNAUTHORIZED;
  }
}

class InvalidTokenProvidedError extends Error {
  constructor() {
    super("Access denied, invalid token provided.");
    this.statusCode = STATUS_CODE.ERROR.CLIENT.FORBIDDEN;
  }
}

module.exports = {
  NoTokenProvidedError,
  InvalidTokenProvidedError,
};
