const Book = require("./book.model");
const Category = require("./category.model");

Category.hasMany(Book, { foreignKey: "categoryId" });
Book.belongsTo(Category, {
  foreignKey: {
    name: "categoryId",
    allowNull: false,
  },
});

module.exports = {
  Book,
  Category,
};
