const { User } = require("../models");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ where: { email: email } });

    if (!user) {
      return res.status(401).json({
        message: "Invalid Email or Password!",
      });
    }

    if (!user.isActive) {
      return res.status(403).json({
        message: "Your Account is inActive",
      });
    }

    const matchPassword = await bcrypt.compare(password, user.password);

    if (!matchPassword) {
      return res.status(401).json({
        message: "Invalid Email or Password!",
      });
    }

    const token = jwt.sign(
      {
        id: user.id,
      },
      process.env.JWT_SECRET,
      { expiresIn: "7d" },
    );

    return res.status(200).json({
      message: "Login Successfully!",
      access_toke: token,
      id: user.id,
      email: user.email,
      isActive: user.isActive,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: "Internal Server Error",
    });
  }
};

module.exports = {
  loginUser,
};
