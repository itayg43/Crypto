const http = require("http");

const app = require("./app");

const port = 3001;
const server = http.createServer(app);

process.on("uncaughtException", (error) => {
  console.log(`Uncaught exception: ${error.message}`);
  process.exit(1);
});

process.on("unhandledRejection", (error) => {
  console.log(`Unhandled rejection: ${error.message}`);
  process.exit(1);
});

process.on("SIGINT", () => {
  console.log("Process interrupted");
  process.exit(0);
});

server.listen(port, () => console.log(`Running on port ${port}`));
