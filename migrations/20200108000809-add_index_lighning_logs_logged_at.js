'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.addIndex(
        'lightning_logs',
        ['device', 'loggedAt'],
        {
          indexName: 'IndexLightningLogsDeviceLoggedAt',
          indicesType: 'UNIQUE'
        }
    );
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.removeIndex('lightning_logs', 'IndexLightningLogsDeviceLoggedAt');
  }
};
