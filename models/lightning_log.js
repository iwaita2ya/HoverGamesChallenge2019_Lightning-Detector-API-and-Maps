'use strict';
module.exports = (sequelize, DataTypes) => {
  const lightning_log = sequelize.define('lightning_log', {
    device: DataTypes.STRING,
    geo: DataTypes.GEOMETRY,
    interrupt_type: DataTypes.SMALLINT,
    energy: DataTypes.INTEGER,
    distance: DataTypes.INTEGER,
    loggedAt: DataTypes.DATE
  }, {});
  lightning_log.associate = function(models) {
    // associations can be defined here
  };
  return lightning_log;
};