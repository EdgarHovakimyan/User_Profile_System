const { Sequelize } = require('sequelize');
module.exports = (sequelize) => {
   
  const Order = sequelize.define('order', {
    productId: Sequelize.INTEGER,
    personId: Sequelize.INTEGER,
    total: Sequelize.INTEGER,
    quantity: Sequelize.STRING,
    productName: Sequelize.STRING,
    productImage: Sequelize.STRING 
  });
  return Order;
};