"use strict";

const { Roles, Permission } = require("../models");

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const superAdminRole = await Roles.findOne({
      where: { name: "Super Admin" },
    });

    const LibrarianRole = await Roles.findOne({ where: { name: "Librarian" } });

    if (!superAdminRole || !LibrarianRole) {
      throw new Error("Required Roles not found!");
    }

    const allPermissions = await Permission.findAll();

    await superAdminRole.addPermissions(allPermissions);

    const librarianPermissions = await Permission.findAll({
      where: {
        permissions: {
          [Sequelize.Op.in]: [
            "readBook",
            "issueBook",
            "returnBook",
            "manageMembers",
          ],
        },
      },
    });

    await LibrarianRole.addPermissions(librarianPermissions);
  },

  async down(queryInterface, Sequelize) {
    const superAdminRole = await Roles.findOne({
      where: { name: "Super Admin" },
    });

    const librarianRole = await Roles.findOne({
      where: { name: "Librarian" },
    });

    if (superAdminRole) {
      await superAdminRole.setPermissions([]);
    }

    if (librarianRole) {
      await librarianRole.setPermissions([]);
    }
  },
};
