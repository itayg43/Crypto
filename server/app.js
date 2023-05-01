require("express-async-errors");
const express = require("express");
const cors = require("cors");

const healthRouter = require("./routers/health.router");

const app = express();

app.use(cors());
app.use(express.json());
app.use("/health", healthRouter);

module.exports = app;
