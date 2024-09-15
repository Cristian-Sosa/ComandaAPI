const { Sequelize } = require('sequelize');

// Configuración de la base de datos
const sequelize = new Sequelize('comanda', 'root', 'admin', {
  host: 'localhost', // Host de la base de datos
  dialect: 'mysql', // Tipo de base de datos (puede ser 'mysql', 'postgres', 'sqlite', 'mssql', etc.)
});

module.exports = sequelize;
