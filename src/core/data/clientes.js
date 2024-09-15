'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('CLIENTES', {
      Id: {
        type: Sequelize.BIGINT,
        primaryKey: true,
        autoIncrement: true,
      },
      nombre: {
        type: Sequelize.STRING(256),
        allowNull: false,
      },
      apellido: {
        type: Sequelize.STRING(256),
        allowNull: false,
      },
      documento: {
        type: Sequelize.STRING(8),
        allowNull: false,
      },
      correo: {
        type: Sequelize.STRING(256),
        allowNull: true,
        unique: true,
      },
      telefono: {
        type: Sequelize.STRING(256),
        allowNull: true,
        unique: true,
      },
      sucursal_alta: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      fecha_alta: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.NOW,
      },
      contador_frecuencia: {
        type: Sequelize.BIGINT,
        allowNull: false,
        defaultValue: 0
      },
      ultimo_consumo: {
        type: Sequelize.DATE,
        allowNull: true
      },
      estado: {
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue: 1,
      },
    });
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.dropTable('CLIENTES');
  }
};
