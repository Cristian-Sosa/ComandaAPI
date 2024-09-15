const { DataTypes } = require("sequelize");
const sequelize = require("../../../config/sequelize-config");

const Pedidos = sequelize.define(
  "PEDIDOS",
  {
    id: {
      type: DataTypes.BIGINT,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    aclaracion: {
      type: DataTypes.STRING(256),
      allowNull: true,
    },
    empleado_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    mesa_id: {
      type: DataTypes.BIGINT,
      allowNull: false,
    },
    cliente_id: {
      type: DataTypes.BIGINT,
      allowNull: true,
    },
    sucursal_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    mesas_extra: {
      type: DataTypes.STRING(256),
      allowNull: true,
    },
    fecha_inicio: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
    fecha_fin: {
      type: DataTypes.DATE,
      allowNull: true,
      defaultValue: DataTypes.NOW,
    },
    total: {
      type: DataTypes.DECIMAL(20, 2),
      allowNull: true,
    },
    cantidadClientes: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
  },
  {
    timestamps: true,
    tableName: "PEDIDOS",
  }
);

module.exports = Pedidos;
