'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('lightning_logs', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      device: {
        type: Sequelize.STRING
      },
      geo: {
        type: Sequelize.GEOMETRY
      },
      interrupt_type: {
        type: Sequelize.SMALLINT
      },
      energy: {
        type: Sequelize.INTEGER
      },
      distance: {
        type: Sequelize.INTEGER
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('lightning_logs');
  }
};