require("express-async-errors");
const express = require("express");
const cors = require("cors");

const requestLoggerMiddleware = require("./middlewares/request-logger.middleware");
const errorHandlerMiddleware = require("./middlewares/error-handler.middleware");

const healthRouter = require("./routers/health.router");

const app = express();

app.use(cors());
app.use(requestLoggerMiddleware);
app.use(express.json());
app.use("/health", healthRouter);
app.use(errorHandlerMiddleware);

module.exports = app;
