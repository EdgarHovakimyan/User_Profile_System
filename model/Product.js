const { Sequelize } = require('sequelize');
module.exports = (sequelize) => {
   
  const Product = sequelize.define('product', {
    title: Sequelize.STRING,
    description: Sequelize.STRING,
    price: Sequelize.INTEGER,
    count: Sequelize.INTEGER,
    managerId: Sequelize.INTEGER,
    categoryId: Sequelize.INTEGER,
  });
  return Product;
};