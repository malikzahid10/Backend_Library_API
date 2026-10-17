"use strict";

const { Roles, Category, Permission } = require("../models");

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const superAdminRole = await Roles.findOne({
      where: { name: "Super Admin" },
    });

    const librarianRole = await Roles.findOne({ where: { name: "Librarian" } });

    if (!superAdminRole || !librarianRole) {
      throw new Error("Super Admin Role and Librarion Role not Found!");
    }

    const categoryPermissions = await Permission.findAll({
      where: {
        permissions: [
          "createCategory",
          "readCategory",
          "updateCategory",
          "deleteCategory",
        ],
      },
    });

    await superAdminRole.addPermissions(categoryPermissions);

    const readCategoryPermission = await Permission.findOne({
      where: { permissions: "readCategory" },
    });

    await librarianRole.addPermissions(readCategoryPermission);
  },

  async down(queryInterface, Sequelize) {
    const superAdmin = await Roles.findOne({
      where: { name: "Super Admin" },
    });

    const librarian = await Roles.findOne({
      where: { name: "Librarian" },
    });

    const categoryPermissions = await Permission.findAll({
      where: {
        permissions: [
          "createCategory",
          "readCategory",
          "updateCategory",
          "deleteCategory",
        ],
      },
    });

    const readCategoryPermission = await Permission.findOne({
      where: { permissions: "readCategory" },
    });

    if (superAdmin) {
      await superAdmin.removePermissions(categoryPermissions);
    }

    if (librarian && readCategoryPermission) {
      await librarian.removePermissions(readCategoryPermission);
    }
  },
};
