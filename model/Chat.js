const { Sequelize } = require('sequelize')
module.exports = (sequelize) => {

    const Chat = sequelize.define('chat', {
        text: Sequelize.STRING,
        fromId: Sequelize.INTEGER,
        toId: Sequelize.INTEGER
    })
    return Chat
}