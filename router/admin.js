const express = require('express');
const admin = express.Router();
const { UserController } = require('../controller/UserController');
const { upload } = require('../upload');

admin.get('/addCategory', UserController.addCategory);
admin.get('/adminCategory', UserController.getAdminCategories);
admin.get('/users', UserController.getUsers);
admin.get('/editCategory/:id',UserController.editCategory);
admin.get('/wishlist',UserController.addToWishlist);
admin.post('/updateCategory/:id',UserController.updateCategory);



admin.post('/addCategory', upload.single('image'), UserController.addNewCategory);

module.exports = { admin };
