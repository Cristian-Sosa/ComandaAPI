'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('EMPLEADOS', {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      nombre: {
        type: Sequelize.STRING(50),
        allowNull: false,
      },
      apellido: {
        type: Sequelize.STRING(50),
        allowNull: false,
      },
      documento: {
        type: Sequelize.STRING(8),
        allowNull: false,
        unique: true
      },
      correo: {
        type: Sequelize.STRING(50),
        allowNull: true,
      },
      telefono: {
        type: Sequelize.STRING(50),
        allowNull: true,
      },
      inicio_contrato: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.NOW,
      },
      fin_contrato: {
        type: Sequelize.DATE,
        allowNull: true,
      },
      usuario: {
        type: Sequelize.STRING(20),
        allowNull: false,
      },
      clave: {
        type: Sequelize.STRING(256),
        allowNull: false,
      },
      rol_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      sucursal_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      estado: {
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue: 1,
      },
    });
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.dropTable('EMPLEADOS');
  }
};
