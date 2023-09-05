const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
require("express-async-errors");

const config = require("./utils/config");
const blogsRouter = require("./controllers/blogs");
const usersRouter = require("./controllers/users");
const middleware = require("./utils/middleware");
const logger = require("./utils/logger");
const loginRouter = require("./controllers/login");

const app = express();

mongoose.set("strictQuery", false);

logger.info("connecting to", config.MONGODB_URI);

mongoose
  .connect(config.MONGODB_URI)
  .then(() => {
    logger.info("Connected to MongoDB");
  })
  .catch((error) => {
    logger.error("Error connecting to MongoDB\n", error.message);
  });

app.use(cors());
app.use(express.json());
app.use(express.static("build"));
app.use(middleware.requestLogger);

app.use(blogsRouter);
app.use(usersRouter);

app.use("/api/blogs", blogsRouter);
app.use("/api/users", usersRouter);
app.use("/api/login", loginRouter);
app.use("/api/blogs/:id/comments", blogsRouter);

if (process.env.NODE_ENV === "test") {
  const testingRouter = require("./controllers/reset");

  app.use("/api/testing", testingRouter);
}

app.use(middleware.unknownEndpoint);
app.use(middleware.errorHandler);

module.exports = app;
