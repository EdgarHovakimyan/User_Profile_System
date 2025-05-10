const { Sequelize } = require('sequelize');
module.exports = (sequelize) => {
   
  const User = sequelize.define('user', {
    name: Sequelize.STRING,
    surname: Sequelize.STRING,
    age: Sequelize.INTEGER,
    email: Sequelize.STRING,
    password: Sequelize.STRING,
    image: Sequelize.STRING,
    token: Sequelize.STRING,
    role: Sequelize.INTEGER,
    isVerify: Sequelize.INTEGER,
  });
  return User;
};


 //0-user, 1-manager, 2-admin