const { DataTypes } = require("sequelize");
const sequelize = require("../../../config/sequelize-config");

const Sucursales = sequelize.define(
  "SUCURSALES",
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
    direccion: {
      type: DataTypes.STRING(256),
      allowNull: false,
      unique: true,
    },
    estado: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 1,
    },
  },
  {
    timestamps: false,
    tableName: "SUCURSALES",
  }
);

module.exports = Sucursales;
