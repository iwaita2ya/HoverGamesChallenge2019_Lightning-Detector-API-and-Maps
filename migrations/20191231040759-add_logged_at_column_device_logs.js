'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.addColumn(
        'device_logs',
        'loggedAt',
        {
          type: Sequelize.DATE,
          defaultValue: Sequelize.NOW
        }
    );
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.removeColumn(
        'device_logs',
        'loggedAt'
    );
  }
};
