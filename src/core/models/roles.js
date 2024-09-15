const { DataTypes } = require("sequelize");
const sequelize = require("../../../config/sequelize-config");

const Roles = sequelize.define(
  "ROLES",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    nombre: {
      type: DataTypes.STRING(256),
      allowNull: false,
      unique: true,
    },
    ruta_acceso: {
      type: DataTypes.STRING(256),
      allowNull: false,
      unique: true,
    },
  },
  {
    timestamps: false,
    tableName: "ROLES",
  }
);

module.exports = Roles;
