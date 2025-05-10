const express = require('express');
const manager = express.Router();
const { UserController } = require('../controller/UserController');
const { upload } = require('../upload');

manager.get('/addProduct', UserController.addProduct)
manager.get('/my-products', UserController.getMyProducts)
manager.get('/deleteProductImage/:id', UserController.deleteProductImageById)
manager.get('/deleteProduct/:id', UserController.deleteProductById);
manager.get('/wishlist',UserController.addToWishlist);


manager.post('/addProduct',upload.array("images"), UserController.addNewProduct)


module.exports = { manager };
