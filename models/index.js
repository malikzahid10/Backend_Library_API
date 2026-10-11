const Book = require("./book.model");
const Category = require("./category.model");
const User = require("./user.model");
const Roles = require("./role.model");

Category.hasMany(Book, { foreignKey: "categoryId" });
Book.belongsTo(Category, {
  foreignKey: {
    name: "categoryId",
    allowNull: false,
  },
});

User.belongsToMany(Roles, { through: "User_Has_Roles" });
Roles.belongsToMany(User, { through: "User_Has_Roles" });

module.exports = {
  Book,
  Category,
  User,
  Roles,
};
