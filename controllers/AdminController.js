const fs = require("fs");
const {
    User,
    Category,
    Product,
    Wishlist,
    MyCart,
} = require("../models");


class AdminController {
    static async addCategory(req, res) {
        try {
            res.render("addCategory");
        } catch (error) {
            console.error("Error rendering addCategory page:", error);
            res.status(500).send("Internal Server Error");
        }
    }
    
    static async getAdminCategories(req, res) {
        try {
            const categories = await Category.findAll();
            res.render("adminCategories", { categories });
        } catch (error) {
            console.error("Error fetching admin categories:", error);
            res.status(500).send("Internal Server Error");
        }
    }

    static async getUsers(req, res) {
        try {
            const users = await User.findAll();
            res.render("users", {
                user: req.user,
                users,
                admin: req.user.role == 2 ? true : undefined,
                manager: req.user.role == 1 ? true : undefined,
                person: req.user.role == 0 ? true : undefined,
            });
        } catch (error) {
            console.error("Error fetching users:", error);
            res.status(500).send("Internal Server Error");
        }
    }

    static async editCategory(req, res) {
        try {
            const category = await Category.findByPk(req.params.id);
            res.render("editCategory", { category });
        } catch (error) {
            console.error("Error fetching category for editing:", error);
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

    static async updateCategory(req, res) {
        try {
            await Category.update(
                { name: req.body.name },
                { where: { id: req.params.id } }
            );
            res.redirect("/admin/editCategory/" + req.params.id);
        } catch (error) {
            console.error("Error updating category:", error);
            res.status(500).send("Internal Server Error");
        }
    }

    static async deleteCategoryById(req, res) {
        try {
            const category = await Category.findOne({
                where: { id: req.params.id },
                include: Product,
            });

            if (!category) {
                return res.status(404).send("Category not found.");
            }

            if (category.products.length > 0) {
                return res
                    .status(400)
                    .send("Cannot delete category with associated products.");
            }
            await Category.destroy({ where: { id: req.params.id } });
            return res.redirect("/admin/adminCategory");
        } catch (error) {
            console.error("Error deleting category:", error);
            res.status(500).send("Internal Server Error");
        }
    }

    static async addNewCategory(req, res) {
        try {
            if (req.file && req.file.filename) {
                await Category.create({
                    name: req.body.name,
                    image: req.file.filename,
                });
            }
            res.redirect("/admin/addCategory");
        } catch (error) {
            console.error("Error adding new category:", error);
            res.status(500).send("Internal Server Error");
        }
    }
}
module.exports = { AdminController }