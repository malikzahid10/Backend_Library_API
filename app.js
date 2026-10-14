const express = require("express");
const authRouter = require("./routes/auth.routes");
const passport = require("passport");

const app = express();

app.use(express.json());
app.use(passport.initialize());

app.use("/api/auth", authRouter);

app.get("/", (req, res) => {
  res.status(200).json({
    message: "Library Backend App Start!",
  });
});

module.exports = app;
