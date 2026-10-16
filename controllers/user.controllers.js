const { User, Roles } = require("../models");
const bcrypt = require("bcrypt");

const createLibrarian = async (req, res) => {
  try {
    const { userName, email, password, isActive } = req.body;

    const existUser = await User.findOne({ where: { email: email } });

    if (existUser) {
      return res.status(409).json({
        message: "This Email is Already Registered!",
      });
    }

    const librarianRole = await Roles.findOne({ where: { name: "Librarian" } });

    if (!librarianRole) {
      return res.status(500).json({
        message: "Librarian Role not found!",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const librarian = await User.create({
      userName,
      email,
      password: hashedPassword,
      isActive,
    });

    await librarian.addRoles(librarianRole);

    return res.status(201).json({
      message: "Librarian Created Successfully!",
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: "Internal Server Error",
    });
  }
};

const deleteLibrarian = async (req, res) => {
  try {
    const { id } = req.params;

    const user = await User.findOne({ where: { id: id }, include: [Roles] });

    if (!user) {
      return res.status(404).json({
        message: "User not found!",
      });
    }

    const librarianUser = user.Roles.some((role) => role.name === "Librarian");

    if (!librarianUser) {
      return res.status(400).json({
        message: "This role is not librarian",
      });
    }

    await user.destroy();

    return res.status(200).json({
      message: "Librarian Delete Successfully!",
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: "Internal Server Error",
    });
  }
};

module.exports = { createLibrarian, deleteLibrarian };
