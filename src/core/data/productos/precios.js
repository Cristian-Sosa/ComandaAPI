"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("PRECIOS", {
      id: {
        type: Sequelize.BIGINT,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      producto_id: {
        type: Sequelize.BIGINT,
        allowNull: false,
      },
      sucursal_id: {
        type: Sequelize.INTEGER,
        allowNull: true,
      },
      precio: {
        type: Sequelize.DECIMAL(20, 2),
        allowNull: true,
      },
      oferta: {
        type: Sequelize.TINYINT,
        allowNull: false,
      },
      fecha_inicio: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.NOW,
      },
      fecha_fin: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      fecha_alta: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.NOW,
      },
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("PRECIOS");
  },
};
