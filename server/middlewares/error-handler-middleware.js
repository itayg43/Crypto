const { STATUS_CODE } = require("../constants");

const DEFAULT_MESSAGE = "Something went wrong.";

function errorHandler(error, _, res, _) {
  console.log(error);
  const statusCode = error.statusCode ?? STATUS_CODE.ERROR.SERVER.INTERNAL;
  const message = error.message ?? DEFAULT_MESSAGE;
  res.status(statusCode).json({ message });
}

module.exports = errorHandler;
