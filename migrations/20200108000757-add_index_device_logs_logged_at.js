'use strict';

module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.addIndex(
            'device_logs',
            ['device', 'loggedAt'],
            {
                indexName: 'IndexDeviceLogsDeviceLoggedAt',
                indicesType: 'UNIQUE'
            }
        );
    },

    down: (queryInterface, Sequelize) => {
        return queryInterface.removeIndex('device_logs', 'IndexDeviceLogsDeviceLoggedAt');
    }
};
