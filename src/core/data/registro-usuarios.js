'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('REGISTRO_ACCIONES', {
      id: {
        type: Sequelize.BIGINT,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      usuario_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      fecha: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.NOW,
      },
      accion: {
        type: Sequelize.TEXT,
        allowNull: false,
      },
      observaciones: {
        type: Sequelize.TEXT,
      },
    });
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.dropTable('REGISTRO_ACCIONES');
  }
};
