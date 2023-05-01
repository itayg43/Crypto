const jwt = require("jsonwebtoken");

const {
  NoTokenProvidedError,
  InvalidTokenProvidedError,
} = require("../errors");

function validateUserAuthentication(req, _, next) {
  const token = req.header("x-token");

  if (!token) {
    throw new NoTokenProvidedError();
  }

  try {
    const decodedToken = jwt.verify(token, process.env.JWT_PRIVATE_KEY);
    req.user = decodedToken;
    next();
  } catch (error) {
    throw new InvalidTokenProvidedError();
  }
}

module.exports = validateUserAuthentication;
