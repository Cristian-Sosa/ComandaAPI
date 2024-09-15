'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('PRODUCTOS', {
      id: {
        type: Sequelize.BIGINT,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      codigo_interno: {
        type:Sequelize.STRING(256),
        allowNull: true
      },
      codigo_proveedor: {
        type:Sequelize.STRING(256),
        allowNull: true
      },
      codigo_ean: {
        type:Sequelize.STRING(256),
        allowNull: true
      },
      nombre: {
        type: Sequelize.STRING(256),
        allowNull: false,
      },
      descripcion: {
        type: Sequelize.STRING(256),
        allowNull: true,
      },
      aclaracion: {
        type: Sequelize.STRING(256),
        allowNull: true,
      },
      categoria: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      proveedor_id: {
        type: Sequelize.INTEGER,
        allowNull: true
      },
      sub_categoria: {
        type: Sequelize.INTEGER,
        allowNull: true
      },
      fecha_alta: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.NOW,
      },
      estado: {
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue: 1,
      },
    });
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.dropTable('PRODUCTOS');
  }
};
