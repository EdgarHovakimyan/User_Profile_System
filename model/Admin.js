const { Sequelize } = require('sequelize');
module.exports = (sequelize) => {
   
  const Admin = sequelize.define('admin', {
    userId:{
        type: Sequelize.INTEGER,
        primaryKey: true
    } 
  });
  return Admin;
};