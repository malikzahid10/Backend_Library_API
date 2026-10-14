const { User, Roles, Permission } = require("../models");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({
      where: { email: email },
      include: [{ model: Roles, include: [Permission] }],
    });

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

    const userRoles = [];
    const userPermissions = [];

    for (const role of user.Roles) {
      userRoles.push(role.name);

      for (const permission of role.Permissions) {
        userPermissions.push(permission.permissions);
      }
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
      access_token: token,
      id: user.id,
      email: user.email,
      isActive: user.isActive,
      roles: userRoles,
      permissions: userPermissions,
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
