'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.addColumn(
        'lightning_logs',
        'loggedAt',
        {
          type: Sequelize.DATE,
          defaultValue: Sequelize.NOW
        }
    );
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.removeColumn(
        'lightning_logs',
        'loggedAt'
    );
  }
};
