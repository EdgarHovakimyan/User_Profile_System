const { Sequelize } = require('sequelize');
module.exports = (sequelize) => {
   
  const Category = sequelize.define('category', {
    name: Sequelize.STRING,
    image: Sequelize.STRING
  });
  return Category;
};