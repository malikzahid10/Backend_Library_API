"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert("Permissions", [
      {
        permissions: "createCategory",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        permissions: "readCategory",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        permissions: "updateCategory",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        permissions: "deleteCategory",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("Permissions", {
      permissions: [
        "createCategory",
        "readCategory",
        "updateCategory",
        "deleteCategory",
      ],
    });
  },
};
