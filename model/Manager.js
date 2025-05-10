const { Sequelize } = require('sequelize');
module.exports = (sequelize) => {
  const Manager = sequelize.define('manager', {
    userId: {
      type: Sequelize.INTEGER,
      primaryKey: true,
    },
    phoneNumber: Sequelize.INTEGER,
    number: Sequelize.INTEGER,
    fullName: Sequelize.STRING
  });
  return Manager;
};
