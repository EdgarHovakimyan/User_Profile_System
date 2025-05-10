const fs = require("fs");
const {
    Category,
    ProductImages,
    Product,
    Wishlist,
    MyCart,
} = require("../models");
const { join } = require("path");

class ManagerController {
    static async addProduct(req, res) {
        try {
            const categories = await Category.findAll();
            res.render("addProduct", { categories });
        } catch (error) {
            console.error("Error rendering addProduct page:", error);
            res.status(500).send("Internal Server Error");
        }
    }

    static async getMyProducts(req, res) {
        try {
            const products = await Product.findAll({
                where: { managerId: req.user.id },
                include: [
                    {
                        model: ProductImages,
                        as: "images",
                    },
                ],
            });
            res.render("myProducts", { products });
        } catch (error) {
            console.error("Error fetching user's products:", error);
            res.status(500).send("Internal Server Error");
        }
    }

    static async deleteProductById(req, res) {
        try {
            await Product.destroy({
                where: { id: req.params.id },
            });
            res.redirect("/manager/my-products");
        } catch (error) {
            console.error("Error deleting product:", error);
            res.status(500).send("Internal Server Error");
        }
    }

    static async deleteProductImageById(req, res) {
        try {
            const prod = await ProductImages.findByPk(req.params.id);
            if (prod) {
                fs.unlink(join(__dirname, "..", "public/" + prod.image), (err) => {
                    if (err) console.error("Error deleting product image:", err);
                });
                await ProductImages.destroy({
                    where: { id: req.params.id },
                    force: true,
                });
            }
            res.redirect("/manager/my-products");
        } catch (error) {
            console.error("Error deleting product image:", error);
            res.status(500).send("Internal Server Error");
        }
    }

    static async addToWishlist(req, res) {
        try {
            const x = await Wishlist.findOne({
                where: {
                    userId: req.user.id,
                    productId: req.params.id,
                },
            });
            if (!x) {
                await Wishlist.create({
                    productId: req.params.id,
                    userId: req.user.id,
                });
            }
            res.redirect("/user/products");
        } catch (error) {
            console.error("Error adding to wishlist:", error);
            res.status(500).send("Internal Server Error");
        }
    }

    static async addToCart(req, res) {
        try {
            const x = await MyCart.findOne({
                where: {
                    userId: req.user.id,
                    productId: req.params.id,
                },
            });
            if (!x) {
                await MyCart.create({
                    productId: req.params.id,
                    userId: req.user.id,
                });
            }
            res.redirect("/user/products");
        } catch (error) {
            console.error("Error adding to cart:", error);
            res.status(500).send("Internal Server Error");
        }
    }

    static async addNewProduct(req, res) {
        try {
            const prod = await Product.create({
                ...req.body,
                managerId: req.user.id,
            });

            console.log(req.files);
            for (let key of req.files) {
                await ProductImages.create({ productId: prod.id, image: key.filename });
            }
            res.redirect("/manager/addProduct");
        } catch (error) {
            console.error("Error adding new product:", error);
            res.status(500).send("Internal Server Error");
        }
    }

}

module.exports = { ManagerController }
