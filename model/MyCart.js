const { Sequelize } = require('sequelize');
module.exports = (sequelize) => {
   
  const MyCart = sequelize.define('myCart', {
    productId: Sequelize.INTEGER,
    personId: Sequelize.INTEGER,
    quantity: Sequelize.STRING 
  });
  return MyCart;
};