const express = require("express");

const { STATUS_CODE } = require("../constants");

const healthRouter = express.Router();

healthRouter.use("/", (_, res) => {
  res.status(STATUS_CODE.SUCCESS.OK).send("OK");
});

module.exports = healthRouter;
