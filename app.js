const express = require("express");
const authRouter = require("./routes/auth.routes");
const passport = require("passport");
const userRouter = require("./routes/user.routes");
const bookRouter = require("./routes/book.routes");
const categoryRouter = require("./routes/category.routes");

const app = express();

app.use(express.json());
app.use(passport.initialize());

app.use("/api/auth", authRouter);
app.use("/api/users", userRouter);
app.use("/api/books", bookRouter);
app.use("/api/categories", categoryRouter);

app.get("/", (req, res) => {
  res.status(200).json({
    message: "Library Backend App Start!",
  });
});

module.exports = app;
