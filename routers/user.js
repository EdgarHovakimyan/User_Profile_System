const express = require("express");
const user = express.Router();
const { upload } = require("../upload");
const { UserController } = require("../controllers/UserController");

user.get("/categories", UserController.getCategories);
user.get("/category/:id", UserController.getCategoryDetails);
user.get("/product/:id", UserController.getProductDetails);
user.get("/products", UserController.getProducts);
user.get("/profile", UserController.getProfile);
user.get("/settings", UserController.getSettings);
user.get("/chat", UserController.getChat);
user.get("/addToWishlist/:id", UserController.addToWishlist);
user.get("/wishlist",UserController.getWishlist);
user.get('/addToCart/:id',UserController.addToCart);

user.post("/uploadUserFile", upload.single("avatar"), UserController.uploadUserFile);

module.exports = { user };
