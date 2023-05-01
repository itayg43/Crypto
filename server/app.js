require("express-async-errors");
const express = require("express");
const cors = require("cors");

const requestLogger = require("./middlewares/request-logger.middleware");
const errorHandler = require("./middlewares/error-handler.middleware");

const healthRouter = require("./routers/health.router");

const app = express();

app.use(cors());
app.use(requestLogger);
app.use(express.json());
app.use("/health", healthRouter);
app.use(errorHandler);

module.exports = app;
