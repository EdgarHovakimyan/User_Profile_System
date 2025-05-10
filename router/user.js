const express = require("express");
const user = express.Router();
const { UserController } = require("../controller/UserController");
const { upload } = require("../upload");

user.get("/categories", UserController.getCategories);
user.get("/category/:id", UserController.getCategoryDetails);
user.get("/product/:id", UserController.getProductDetails);
user.get("/products", UserController.getProducts);
user.get("/profile", UserController.getProfile);
user.get("/settings", UserController.getSettings);
user.get("/chat", UserController.getChat);
user.get("/wishlist", UserController.addToWishlist);

user.post("/uploadFile", upload.single("avatar"), UserController.uploadFile);

module.exports = { user };
