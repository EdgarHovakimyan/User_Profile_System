const { Sequelize } = require('sequelize');
module.exports = (sequelize) => {
  const Person = sequelize.define('person', {
    userId: {
      type: Sequelize.INTEGER,
      primaryKey: true,
    },
  });
  return Person;
};
