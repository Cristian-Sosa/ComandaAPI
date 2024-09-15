const { DataTypes } = require("sequelize");
const sequelize = require("../../../config/sequelize-config");

const Mesas = sequelize.define(
  "MESAS",
  {
    id: {
      type: DataTypes.BIGINT,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    nombre: {
      type: DataTypes.STRING(256),
      allowNull: false,
    },
    sucursal_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    ubicacion: {
      type: DataTypes.STRING(256),
      allowNull: true,
    },
    estado: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 1,
    },
  },
  {
    timestamps: false,
    tableName: "MESAS",
  }
);

module.exports = Mesas;
