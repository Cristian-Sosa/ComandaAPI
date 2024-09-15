const { DataTypes } = require("sequelize");
const sequelize = require("../../../config/sequelize-config");

const Cliente = sequelize.define(
  "CLIENTES",
  {
    Id: {
      type: DataTypes.BIGINT,
      primaryKey: true,
      autoIncrement: true,
    },
    nombre: {
      type: DataTypes.STRING(256),
      allowNull: false,
    },
    apellido: {
      type: DataTypes.STRING(256),
      allowNull: false,
    },
    documento: {
      type: DataTypes.STRING(8),
      allowNull: false,
    },
    correo: {
      type: DataTypes.STRING(256),
      allowNull: true,
      unique: true,
    },
    telefono: {
      type: DataTypes.STRING(256),
      allowNull: true,
      unique: true,
    },
    sucursal_alta: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    contador_frecuencia: {
      type: DataTypes.BIGINT,
      allowNull: false,
      defaultValue: 0,
    },
    ultimo_consumo: {
      type: DataTypes.DATE,
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
    tableName: "CLIENTES",
  }
);

module.exports = Cliente;
