const express = require('express');
const admin = express.Router();
const { AdminController } = require('../controllers/AdminController');
const { upload } = require('../upload');

admin.get('/addCategory', AdminController.addCategory);
admin.get('/adminCategory', AdminController.getAdminCategories);
admin.get('/users', AdminController.getUsers);
admin.get('/editCategory/:id',AdminController.editCategory);
admin.get('/wishlist',AdminController.addToWishlist);
admin.get('/addToCart',AdminController.addToCart);
admin.post('/updateCategory/:id',AdminController.updateCategory);
admin.get("/deleteCategory/:id", AdminController.deleteCategoryById);



admin.post('/addCategory', upload.single('image'), AdminController.addNewCategory);

module.exports = { admin };
