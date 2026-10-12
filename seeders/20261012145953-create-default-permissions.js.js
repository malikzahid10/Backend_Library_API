"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert("Permissions", [
      {
        permissions: "createBook",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        permissions: "readBook",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        permissions: "updateBook",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        permissions: "deleteBook",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        permissions: "issueBook",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        permissions: "returnBook",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        permissions: "manageMembers",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("Permissions", null, {});
  },
};
