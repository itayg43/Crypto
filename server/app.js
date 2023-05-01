require("express-async-errors");
const express = require("express");
const cors = require("cors");

const requestLoggerMiddleware = require("./middlewares/request-logger-middleware");
const errorHandlerMiddleware = require("./middlewares/error-handler-middleware");

const healthRouter = require("./routers/health-router");
const apiRouter = require("./routers/api-router");

const app = express();
const corsOptions = {
  exposedHeaders: "x-token",
};

app.use(cors(corsOptions));
app.use(requestLoggerMiddleware);
app.use(express.json());
app.use("/health", healthRouter);
app.use("/api", apiRouter);
app.use(errorHandlerMiddleware);

module.exports = app;
