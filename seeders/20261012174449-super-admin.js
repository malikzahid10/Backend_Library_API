"use strict";
require("dotenv").config();
const bcrypt = require("bcrypt");
const { User, Roles } = require("../models");

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const encryptedPassword = await bcrypt.hash(
      process.env.SUPER_ADMIN_PASSWORD,
      10,
    );
    const user = await User.create({
      userName: "Super Admin",
      email: process.env.SUPER_ADMIN_EMAIL,
      password: encryptedPassword,
      isActive: true,
    });

    const superAdminRole = await Roles.findOne({
      where: { name: "Super Admin" },
    });

    await user.addRoles(superAdminRole);
  },

  async down(queryInterface, Sequelize) {
    await User.destroy({ where: { email: process.env.SUPER_ADMIN_EMAIL } });
  },
};
