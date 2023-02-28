const express = require("express");
const logger = require("morgan");
const cors = require("cors");
const dotenv = require("dotenv");

dotenv.config();

const swaggerUi = require("swagger-ui-express");
const swaggerDocument = require("./swagger.json");

const { friendsRouter } = require("./src/routes/api/friends");
const { newsRouter } = require("./src/routes/api/news");
const { routerNotices } = require("./src/routes/api/notices");

const { authRouter } = require("./src/routes/api/user");

const { petRouter } = require("./src/routes/api/pets");

const app = express();

const formatsLogger = app.get("env") === "development" ? "dev" : "short";

app.use(logger(formatsLogger));
app.use(cors());
app.use(express.json());
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.use("/api/users", authRouter);
app.use("/api/friends", friendsRouter);
app.use("/api/news", newsRouter);

app.use("/api/notices", routerNotices);
app.use("/api/pets", petRouter);

app.use((req, res) => {
  res.status(404).json({ message: "Not found" });
});

app.use((err, req, res, next) => {
  console.log(err.message);
  if (err.message.includes("Cast to ObjectId failed for value")) {
    return res.status(404).json({
      message: "Not found",
    });
  }

  if (err.message.includes("duplicate key error collection")) {
    return res.status(409).json({
      message: err.message,
    });
  }

  return res
    .status(err.status || 500)
    .json({ message: err.message || "Internal server error" });
});

module.exports = app;
