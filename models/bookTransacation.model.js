const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const BookTransacation = sequelize.define(
  "BookTransacation",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    issueDate: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },

    dueDate: {
      type: DataTypes.DATE,
      allowNull: false,
    },

    returnDate: {
      type: DataTypes.DATE,
      allowNull: true,
    },

    status: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: "issued",
      validate: {
        isIn: [["issued", "returned", "overdue"]],
      },
    },
  },

  { timestamps: true },
);

module.exports = BookTransacation;
