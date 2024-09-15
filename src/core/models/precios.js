const { DataTypes } = require("sequelize");
const sequelize = require("../../../config/sequelize-config");

const Precios = sequelize.define(
  "PRECIOS",
  {
    id: {
      type: DataTypes.BIGINT,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    producto_id: {
      type: DataTypes.BIGINT,
      allowNull: false,
    },
    sucursal_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    precio: {
      type: DataTypes.DECIMAL(20, 2),
      allowNull: true,
    },
    oferta: {
      type: DataTypes.TINYINT,
      allowNull: false,
    },
    fecha_inicio: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
    fecha_fin: {
      type: DataTypes.DATE,
      allowNull: false,
    },
  },
  {
    timestamps: true,
    tableName: "PRECIOS",
  }
);

module.exports = Precios;