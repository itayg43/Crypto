const { STATUS_CODE } = require("../constants");

const defaultMessage = "Something went wrong.";

function errorHandler(error, _, res, _) {
  console.log(error);
  const statusCode = error.statusCode ?? STATUS_CODE.ERROR.SERVER.INTERNAL;
  const message = error.message ?? defaultMessage;
  res.status(statusCode).json({ message });
}

module.exports = errorHandler;
