const { DataTypes } = require("sequelize");
const sequelize = require("../../../config/sequelize-config");

const Producto = sequelize.define(
  "PRODUCTOS",
  {
    id: {
      type: DataTypes.BIGINT,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    codigo_interno: {
      type: DataTypes.STRING(256),
      allowNull: true,
    },
    codigo_proveedor: {
      type: DataTypes.STRING(256),
      allowNull: true,
    },
    codigo_ean: {
      type: DataTypes.STRING(256),
      allowNull: true,
    },
    nombre: {
      type: DataTypes.STRING(256),
      allowNull: false,
    },
    descripcion: {
      type: DataTypes.STRING(256),
      allowNull: true,
    },
    aclaracion: {
      type: DataTypes.STRING(256),
      allowNull: true,
    },
    categoria: {
      type: DataTypes.BIGINT,
      allowNull: false,
    },
    proveedor_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    sub_categoria: {
      type: DataTypes.BIGINT,
      allowNull: true,
    },
    estado: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 1,
    },
  },
  {
    timestamps: true,
    tableName: "PRODUCTOS",
  }
);

module.exports = Producto;
