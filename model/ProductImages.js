const { Sequelize } = require('sequelize');
module.exports = (sequelize) => {
   
  const ProductImages = sequelize.define('product-images', {
    productId: Sequelize.INTEGER,
    image: Sequelize.STRING
  });
  return ProductImages;
};