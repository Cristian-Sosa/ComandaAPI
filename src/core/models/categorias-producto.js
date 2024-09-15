const { DataTypes } = require("sequelize");
const sequelize = require("../../../config/sequelize-config");

const CategoriaProducto = sequelize.define(
  "CATEGORIA_PRODUCTO",
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
    estado: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 1,
    },
  },
  {
    timestamps: false,
    tableName: "CATEGORIA_PRODUCTO",
  }
);

CategoriaProducto.sync()

module.exports = CategoriaProducto;
