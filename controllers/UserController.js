const fs = require("fs");
const {
  User,
  Category,
  ProductImages,
  Product,
  Manager,
  Wishlist,
  MyCart,
} = require("../models");
const { Op } = require("sequelize");
const { join } = require("path");

class UserController {
  static async getCategories(req, res) {
    try {
      const categories = await Category.findAll();
      res.render("categories", {
        user: req.user,
        admin: req.user.role == 2 ? true : undefined,
        manager: req.user.role == 1 ? true : undefined,
        person: req.user.role == 0 ? true : undefined,
        categories,
      });
    } catch (error) {
      console.error("Error fetching categories:", error);
      res.status(500).send("Internal Server Error");
    }
  }

  static async getCategoryDetails(req, res) {
    try {
      const products = await Product.findAll();
      res.render("categoryDetails", {
        user: req.user,
        products,
        admin: req.user.role == 2 ? true : undefined,
        manager: req.user.role == 1 ? true : undefined,
        person: req.user.role == 0 ? true : undefined,
      });
    } catch (error) {
      console.error("Error fetching category details:", error);
      res.status(500).send("Internal Server Error");
    }
  }

  static async getProductDetails(req, res) {
    try {
      const products = await Product.findOne({
        where: { id: req.params.id },
        include: [
          {
            model: ProductImages,
            as: "images",
          },
          {
            model: Manager,
            as: "manager",
            include: [
              {
                model: User,
                attributes: ["id", "name", "surname", "email"],
              },
            ],
          },
        ],
      });
      res.render("productDetails", {
        user: req.user,
        admin: req.user.role == 2 ? true : undefined,
        manager: req.user.role == 1 ? true : undefined,
        person: req.user.role == 0 ? true : undefined,
        products,
      });
    } catch (error) {
      console.error("Error fetching product details:", error);
      res.status(500).send("Internal Server Error");
    }
  }

  static async getProducts(req, res) {
    try {
      const products = await Product.findAll({
        include: [
          {
            model: ProductImages,
            as: "images",
          },
        ],
      });
      res.render("products", {
        user: req.user,
        admin: req.user.role == 2 ? true : undefined,
        manager: req.user.role == 1 ? true : undefined,
        person: req.user.role == 0 ? true : undefined,
        products,
      });
    } catch (error) {
      console.error("Error fetching products:", error);
      res.status(500).send("Internal Server Error");
    }
  }

  static async getProfile(req, res) {
    try {
      const product = await Product.findAll({
        include: [
          {
            model: ProductImages,
            as: "images",
          },
        ],
      });
      res.render("profile", {
        user: req.user,
        admin: req.user.role == 2 ? true : undefined,
        manager: req.user.role == 1 ? true : undefined,
        person: req.user.role == 0 ? true : undefined,
        product,
      });
    } catch (error) {
      console.error("Error fetching profile:", error);
      res.status(500).send("Internal Server Error");
    }
  }

  static async getSettings(req, res) {
    try {
      res.render("settings", {
        user: req.user,
        admin: req.user.role == 2 ? true : undefined,
        manager: req.user.role == 1 ? true : undefined,
        person: req.user.role == 0 ? true : undefined,
      });
    } catch (error) {
      console.error("Error rendering settings page:", error);
      res.status(500).send("Internal Server Error");
    }
  }

  static async getChat(req, res) {
    try {
      const users = await User.findAll({
        where: {
          id: {
            [Op.ne]: req.user.id,
          },
        },
      });
      res.render("chat", {
        user: req.user,
        users,
        admin: req.user.role == 2 ? true : undefined,
        manager: req.user.role == 1 ? true : undefined,
        person: req.user.role == 0 ? true : undefined,
      });
    } catch (error) {
      console.error("Error fetching chat users:", error);
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

  static async getWishlist(req, res) {
    try {
      const arr = await Wishlist.findAll({
        where: {
          userId: req.user.id,
        },
        include: [
          {
            model: Product,
            include: [
              {
                model: ProductImages,
                as: "images",
              },
            ],
          },
        ],
      });
      res.render("wishlist", {
        user: req.user,
        arr,
        admin: req.user.role == 2 ? true : undefined,
        manager: req.user.role == 1 ? true : undefined,
        person: req.user.role == 0 ? true : undefined,
      });
    } catch (error) {
      console.error("Error fetching wishlist items:", error);
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
  static async uploadUserFile(req, res) {
    try {
      const user = await User.findByPk(req.user.id);
      if (req.file) {
        if (user.image && user.image !== "user.png") {
          try {
            await fs.unlink(join(__dirname, "..", "public", user.image));
          } catch (err) {
            console.error("Error deleting old image:", err);
          }
        }

        await User.update(
          {
            image: req.file.filename,
            name: req.body.name,
            surname: req.body.surname,
            age: req.body.age,
          },
          { where: { id: user.id } }
        );
      }

      res.redirect("/user/settings");
    } catch (error) {
      console.error("Error uploading file:", error);
      res.status(500).send("Failed to upload file. Please try again.");
    }
  }
}

module.exports = { UserController }