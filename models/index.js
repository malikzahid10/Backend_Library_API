const Book = require("./book.model");
const Category = require("./category.model");
const User = require("./user.model");
const Roles = require("./role.model");
const Permission = require("./permission.model");
const Member = require("./member.model");
const BookTransacation = require("./bookTransacation.model");

Category.hasMany(Book, { foreignKey: "categoryId" });
Book.belongsTo(Category, {
  foreignKey: {
    name: "categoryId",
    allowNull: false,
  },
});

User.belongsToMany(Roles, { through: "User_Has_Roles" });
Roles.belongsToMany(User, { through: "User_Has_Roles" });

Roles.belongsToMany(Permission, { through: "Roles_Permissions" });
Permission.belongsToMany(Roles, { through: "Roles_Permissions" });

Book.hasMany(BookTransacation);
BookTransacation.belongsTo(Book);

Member.hasMany(BookTransacation);
BookTransacation.belongsTo(Member);

User.hasMany(BookTransacation, {
  foreignKey: "issuedBy",
  as: "issuedTransactions",
});

BookTransacation.belongsTo(User, {
  foreignKey: "issuedBy",
  as: "issuer",
});

module.exports = {
  Book,
  Category,
  User,
  Roles,
  Permission,
  Member,
  BookTransacation,
};
