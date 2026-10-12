const Book = require("./book.model");
const Category = require("./category.model");
const User = require("./user.model");
const Roles = require("./role.model");
const Permission = require("./permission.model");
const Member = require("./member.model");

Category.hasMany(Book, { foreignKey: "categoryId" });
Book.belongsTo(Category, {
  foreignKey: {
    name: "categoryId",
    allowNull: false,
  },
});

User.belongsToMany(Roles, { through: "User_Has_Roles" });
Roles.belongsToMany(User, { through: "User_Has_Roles" });

Roles.belongsToMany(Permission, { through: "Roles_Has_Permissions" });
Permission.belongsToMany(Roles, { through: "Roles_Has_Permission" });

module.exports = {
  Book,
  Category,
  User,
  Roles,
  Permission,
  Member,
};
