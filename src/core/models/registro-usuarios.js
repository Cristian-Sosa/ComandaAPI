const { DataTypes } = require("sequelize");
const sequelize = require("../../../config/sequelize-config");

const RegistroAcciones = sequelize.define(
  "CATEGORIA_PRODUCTO",
  {
    id: {
      type: DataTypes.BIGINT,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    usuario_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    fecha: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
    accion: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    observaciones: {
      type: DataTypes.TEXT,
    },
  },
  {
    timestamps: false,
    tableName: "REGISTRO_ACCIONES",
  }
);

module.exports = RegistroAcciones;
