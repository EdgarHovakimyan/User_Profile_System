const { Sequelize } = require("sequelize");
require("dotenv").config();
const sequelize = new Sequelize(`${process.env.DB_NAME}`, "root", "", {
  host: "localhost",
  port: 3306,
  dialect: "mysql",
});

const User = require("./User")(sequelize);
const Admin = require("./Admin")(sequelize);
const Cart = require("./Cart")(sequelize);
const Category = require("./Category")(sequelize);
const Manager = require("./Manager")(sequelize);
const MyCart = require("./MyCart")(sequelize);
const Order = require("./Order")(sequelize);
const Person = require("./Person")(sequelize);
const Product = require("./Product")(sequelize);
const ProductImages = require("./ProductImages")(sequelize);
const Wishlist = require("./Wishlist")(sequelize);
const Chat = require("./Chat")(sequelize);

Admin.belongsTo(User, {
  foreignKey: "userId",
  onupdate: "cascade",
  ondelete: "cascade",
});
Person.belongsTo(User, {
  foreignKey: "userId",
  onupdate: "cascade",
  ondelete: "cascade",
});
Manager.belongsTo(User, {
  foreignKey: "userId",
  onupdate: "cascade",
  ondelete: "cascade",
});
Product.belongsTo(Manager, {
  foreignKey: "managerId",
  onUpdate: "CASCADE",
  onDelete: "CASCADE",
  as: "manager",
});
Product.belongsTo(Category, {
  onupdate: "cascade",
  ondelete: "cascade",
});
ProductImages.belongsTo(Product, {
  onupdate: "cascade",
  ondelete: "cascade",
  foreignKey: "productId",
  as: "product",
});
Cart.belongsTo(User, {
  onupdate: "cascade",
  ondelete: "cascade",
});
Cart.belongsTo(User, {
  foreignKey: "userId",
  onupdate: "cascade",
  ondelete: "cascade",
});
Order.belongsTo(Product);
Order.belongsTo(User, {
  foreignKey: "userId",
  onupdate: "cascade",
  ondelete: "cascade",
});
Wishlist.belongsTo(User, {
  foreignKey: "userId",
  onupdate: "cascade",
  ondelete: "cascade",
});
Wishlist.belongsTo(Product, {
  foreignKey: "productId",
  onupdate: "cascade",
  ondelete: "cascade",
});
MyCart.belongsTo(User, {
  onupdate: "cascade",
  ondelete: "cascade",
});
MyCart.belongsTo(Product, {
  onupdate: "cascade",
  ondelete: "cascade",
});
Chat.belongsTo(User, {
  foreignKey: "fromId",
  as: "from",
});
Chat.belongsTo(User, {
  foreignKey: "toId",
  as: "to",
});

User.hasOne(Admin, { foreignKey: "userId" });
User.hasOne(Person, { foreignKey: "userId" });
User.hasOne(Manager, { foreignKey: "userId" });

Manager.hasMany(Product, {
  foreignKey: "managerId",
  onupdate: "cascade",
  ondelete: "cascade",
  as: "manager",
});
Category.hasMany(Product);
Product.hasMany(ProductImages, {
  foreignKey: "productId",
  onupdate: "cascade",
  ondelete: "cascade",
  as: "images",
});
Product.hasMany(Cart);
Person.hasMany(Cart);
Product.hasMany(Order);
User.hasMany(Order, { foreignKey: "userId" });
User.hasMany(Wishlist, { foreignKey: "userId" });
Product.hasMany(Wishlist, { foreignKey: "productId" });
Person.hasMany(MyCart);
Product.hasMany(MyCart);
User.hasMany(Chat, {
  foreignKey: "fromId",
  as: "from",
});
User.hasMany(Chat, {
  foreignKey: "toId",
  as: "to",
});

sequelize.sync();
module.exports = {
  sequelize,
  User,
  Admin,
  Cart,
  Category,
  Manager,
  MyCart,
  Order,
  Person,
  Product,
  ProductImages,
  Wishlist,
  Chat,
};
