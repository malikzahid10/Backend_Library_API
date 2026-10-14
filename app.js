const express = require("express");
const authRouter = require("./routes/auth.routes");

const app = express();

app.use(express.json());

app.use("/api/auth", authRouter);

app.get("/", (req, res) => {
  res.status(200).json({
    message: "Library Backend App Start!",
  });
});

module.exports = app;
