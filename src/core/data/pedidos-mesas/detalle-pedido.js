"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("DETALLE_PEDIDO", {
      id: {
        type: Sequelize.BIGINT,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      pedido_id: {
        type: Sequelize.BIGINT,
        allowNull: false,
      },
      producto_id: {
        type: Sequelize.BIGINT,
        allowNull: false,
      },
      cantidad: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      fecha_pedido: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.NOW,
      },
      fecha_entrega: {
        type: Sequelize.DATE,
        allowNull: true,
      },
      total: {
        type: Sequelize.DECIMAL(20, 2),
        allowNull: false,
      },
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("DETALLE_PEDIDO");
  },
};
