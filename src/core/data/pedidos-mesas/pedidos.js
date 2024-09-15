'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('PEDIDOS', {
      id: {
        type: Sequelize.BIGINT,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      aclaracion: {
        type: Sequelize.STRING(256),
        allowNull: true
      },
      empleado_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      mesa_id: {
        type: Sequelize.BIGINT,
        allowNull: false,
      },
      cliente_id: {
        type: Sequelize.BIGINT,
        allowNull: true,
      },
      sucursal_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      mesas_extra: {
        type: Sequelize.STRING(256),
        allowNull: true,
      },
      fecha_inicio: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.NOW,
      },
      fecha_fin: {
        type: Sequelize.DATE,
        allowNull: true,
        defaultValue: Sequelize.NOW,
      },
      total: {
        type: Sequelize.DECIMAL(20, 2),
        allowNull: true,
      },
      cantidadClientes: {
        type: Sequelize.INTEGER,
        allowNull: true
      }
    });
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.dropTable('PEDIDOS');
  }
};
