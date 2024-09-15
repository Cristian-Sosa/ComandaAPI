'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('MESAS', {
      id: {
        type: Sequelize.BIGINT,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      nombre: {
        type: Sequelize.STRING(256),
        allowNull: false,
      },
      sucursal_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      ubicacion: {
        type: Sequelize.STRING(256),
        allowNull: true,
      },
      estado: {
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue: 1,
      },
    });
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.dropTable('MESAS');
  }
};
