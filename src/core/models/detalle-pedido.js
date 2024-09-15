const { DataTypes } = require("sequelize");
const sequelize = require("../../../config/sequelize-config");

const DetallePedido = sequelize.define(
  "DETALLE_PEDIDO",
  {
    id: {
      type: DataTypes.BIGINT,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    pedido_id: {
      type: DataTypes.BIGINT,
      allowNull: false,
    },
    producto_id: {
      type: DataTypes.BIGINT,
      allowNull: false,
    },
    cantidad: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    fecha_pedido: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
    fecha_entrega: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    total: {
      type: DataTypes.DECIMAL(20, 2),
      allowNull: false,
    },
  },
  {
    timestamps: false,
    tableName: "DETALLE_PEDIDO",
  }
);

module.exports = DetallePedido;
