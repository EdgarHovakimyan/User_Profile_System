const { Sequelize } = require('sequelize');
module.exports = (sequelize) => {
  const Wishlist = sequelize.define('wishlist', {
    userId: {
      type: Sequelize.INTEGER,
      primaryKey: true,
    },
    productId: {
      type: Sequelize.INTEGER,
      primaryKey: true,
    },
  });
  return Wishlist;
};
