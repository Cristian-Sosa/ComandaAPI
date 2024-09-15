const { DataTypes } = require("sequelize");
const sequelize = require("../../../config/sequelize-config");

const Empleados = sequelize.define(
  "EMPLEADOS",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    nombre: {
      type: DataTypes.STRING(50),
      allowNull: false,
    },
    apellido: {
      type: DataTypes.STRING(50),
      allowNull: false,
    },
    documento: {
      type: DataTypes.STRING(8),
      allowNull: false,
      unique: true,
    },
    correo: {
      type: DataTypes.STRING(50),
      allowNull: true,
    },
    telefono: {
      type: DataTypes.STRING(50),
      allowNull: true,
    },
    inicio_contrato: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
    fin_contrato: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    usuario: {
      type: DataTypes.STRING(20),
      allowNull: false,
    },
    clave: {
      type: DataTypes.STRING(256),
      allowNull: false,
    },
    rol_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    sucursal_id: {
      type: DataTypes.INTEGER,
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
    tableName: "EMPLEADOS",
  }
);

module.exports = Empleados;
