"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert("Roles", [
      {
        name: "Super Admin",
        description: "Full access to all library operations",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "Librarian",
        description: "Manage books and member transactions",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("Roles", { name: "Super Admin" }, {});

    await queryInterface.bulkDelete("Roles", { name: "Librarian" }, {});
  },
};
