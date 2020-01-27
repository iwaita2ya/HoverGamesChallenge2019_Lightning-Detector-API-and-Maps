'use strict';
module.exports = (sequelize, DataTypes) => {
  const device_log = sequelize.define('device_log', {
    device: DataTypes.STRING,
    geo: DataTypes.GEOMETRY,
    loggedAt: DataTypes.DATE
  }, {});
  device_log.associate = function(models) {
    // associations can be defined here
  };
  return device_log;
};