const express = require("express");

const usersRouter = require("../modules/users/client/users-router");
const holdingsRouter = require("../modules/holdings/client/holdings-router");

const apiRouter = express.Router();

apiRouter.use("/users", usersRouter);
apiRouter.use("/holdings", holdingsRouter);

module.exports = apiRouter;
