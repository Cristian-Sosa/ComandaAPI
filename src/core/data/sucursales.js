'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('SUCURSALES', {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      nombre: {
        type: Sequelize.STRING(256),
        allowNull: false,
        unique: true,
      },
      direccion: {
        type: Sequelize.STRING(256),
        allowNull: false,
        unique: true,
      },
      estado: {
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue: 1,
      },
    });
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.dropTable('SUCURSALES');
  }
};
