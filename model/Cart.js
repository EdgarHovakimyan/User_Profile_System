const { Sequelize } = require('sequelize');
module.exports = (sequelize) => {

  const Cart = sequelize.define('cart', {
    personId: Sequelize.INTEGER,
    number: Sequelize.INTEGER,
    date: Sequelize.STRING,
    fullName: Sequelize.STRING,
    CVV: Sequelize.INTEGER
  });
  return Cart;
};