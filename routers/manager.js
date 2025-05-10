const express = require('express');
const manager = express.Router();
const { ManagerController } = require('../controllers/ManagerController');
const { upload } = require('../upload');

manager.get('/addProduct', ManagerController.addProduct)
manager.get('/my-products', ManagerController.getMyProducts)
manager.get('/deleteProductImage/:id', ManagerController.deleteProductImageById)
manager.get('/deleteProduct/:id', ManagerController.deleteProductById);
manager.get('/wishlist',ManagerController.addToWishlist);
manager.get('/addToCart',ManagerController.addToCart);


manager.post('/addProduct',upload.array("images"), ManagerController.addNewProduct)


module.exports = { manager };