const fs = require("fs");
const { User, Category, ProductImages, Product, Manager } = require("../model");
const { join } = require("path");
const { Op } = require("sequelize");

class UserController {
  static async addCategory(req, res) {
    res.render("addCategory");
  }
  static async addNewCategory(req, res) {
    if (req.file.filename) {
      await Category.create({
        name: req.body.name,
        image: req.file.filename,
      });
    }
    res.redirect("/admin/addCategory");
  }
  static async addProduct(req, res) {
    const categories = await Category.findAll();
    res.render("addProduct", { categories });
  }
  static async addNewProduct(req, res) {
    const prod = await Product.create({
      ...req.body,
      managerId: req.user.id,
    });
    console.log(req.files);
    for (let key of req.files) {
      await ProductImages.create({ productId: prod.id, image: key.filename });
    }
    res.redirect("/manager/addProduct");
  }

  static async getAdminCategories(req, res) {
    const categories = await Category.findAll();
    res.render("adminCategories", { categories });
  }
  static async getCategories(req, res) {
    const categories = await Category.findAll();
    res.render("categories", {
      user: req.user,
      admin: req.user.role == 2 ? true : undefined,
      manager: req.user.role == 1 ? true : undefined,
      person: req.user.role == 0 ? true : undefined,
      categories,
    });
  }
  static async getCategoryDetails(req, res) {
    res.render("categoryDetails", {
      user: req.user,
      admin: req.user.role == 2 ? true : undefined,
      manager: req.user.role == 1 ? true : undefined,
      person: req.user.role == 0 ? true : undefined,
    });
  }
  static async getMyProducts(req, res) {
    const products = await Product.findAll({
      where: { managerId: req.user.id },
      include: [
        {
          model: ProductImages,
          as: "images",
        },
      ],
    });
    // console.log(products);

    res.render("myProducts", { products });
  }
  static async getProductDetails(req, res) {
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
    // console.log(products.manager.user);

    res.render("productDetails", {
      user: req.user,
      admin: req.user.role == 2 ? true : undefined,
      manager: req.user.role == 1 ? true : undefined,
      person: req.user.role == 0 ? true : undefined,
      products,
    });
  }
  static async getProducts(req, res) {
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
  }
  static async getProfile(req, res) {
    // console.log(req.user);

    res.render("profile", {
      user: req.user,
      admin: req.user.role == 2 ? true : undefined,
      manager: req.user.role == 1 ? true : undefined,
      person: req.user.role == 0 ? true : undefined,
    });
  }
  static async getSettings(req, res) {
    res.render("settings", {
      user: req.user,
      admin: req.user.role == 2 ? true : undefined,
      manager: req.user.role == 1 ? true : undefined,
      person: req.user.role == 0 ? true : undefined,
    });
  }
  static async getUsers(req, res) {
    res.render("users");
  }
  static async uploadFile(req, res) {
    // console.log(req.files); // upload.array - multiple
    // console.log(req.file); // upload.single
    const user = await User.findByPk(req.user.id);
    if (req.file) {
      if (user.image != "user.png") {
        // console.log(user.image);
        fs.unlink(
          join(__dirname, "..", "public/" + user.image),
          (err, data) => {
            if (err) err;
          }
        );
      }
      await User.update(
        { image: req.file.filename },
        { where: { id: user.id } }
      );
    }
    res.redirect("/user/settings");
  }
  static async editCategory(req, res) {
    const category = await Category.findByPk(req.params.id);
    res.render("editCategory", { category });
  }
  static async updateCategory(req, res) {
    await Category.update(
      { name: req.body.name },
      { where: { id: req.params.id } }
    );
    res.redirect("/admin/editCategory/" + req.params.id);
  }
  static async deleteProductImageById(req, res) {
    const prod = await ProductImages.findByPk(req.params.id);
    if (prod) {
      fs.unlink(join(__dirname, "..", "public/" + prod.image), (err, data) => {
        if (err) err;
      });
      await ProductImages.destroy({ where: { id: req.params.id } });
    }
    res.redirect("/manager/my-products");
  }
  static async deleteProductById(req, res) {
    const products = await Product.findOne({
      where: { id: req.params.id },
      include: [
        {
          model: ProductImages,
          as: "images",
        },
      ],
    });
    // console.log(req.params.id, products);
    if (products) {
      for (let key of products.images) {
        fs.unlink(join(__dirname, "..", "public/" + key.image), (err, data) => {
          if (err) err;
        });
      }

      await Product.destroy({ where: { id: req.params.id } });
    }
    res.redirect("/manager/my-products");
  }
  static async getChat(req, res) {
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
  }
  static async addToWishlist(req, res) {
    try {
      // Ստանալ բոլոր ապրանքները, ներառելով նկարներ
      const items = await Product.findAll({
        include: [
          {
            model: ProductImages,
            as: "images",
          },
        ],
      });

      // Փոխանցել items Handlebars տեսակի `wishlist.hbs` վայրը
      res.render("wishlist", { items: items });
    } catch (error) {
      console.error("Error fetching wishlist items:", error);
      res.status(500).send("Something went wrong.");
    }
  }
}

module.exports = { UserController };
