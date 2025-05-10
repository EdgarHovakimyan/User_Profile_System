const { Chat } = require("../model");
const { Op } = require("sequelize");
class SocketController {
  constructor(io) {
    this.io = io;
    io.on("connection", (socket) => {
      this.socket = socket;
      console.log("a user connected");
      this.socket.on("joinUser", (x) => this.joinUser(x));
      this.socket.on("sendNewMessage", (data) => this.sendNewMessage(data));
      this.socket.on("getMessage", (data) => this.getMessage(data));
    });
  }
  async joinUser(id) {
    console.log(id);
    this.socket.join(id);
  }
  async sendNewMessage(data) {
    //{fromId, toId, text}
    console.log("sendNewMessage");
    console.log(data);
    await Chat.create(data);
    const arr = await Chat.findAll({
      where: {
        [Op.or]: [
          { fromId: data.fromId, toId: data.toId },
          { toId: data.fromId, fromId: data.toId },
        ],
      },
    });
    console.log(arr);
    this.socket.emit("sendMessage", arr);
    this.socket.broadcast.emit("sendMessage", arr);
  }
  async getMessage(data) {
   // {fromId, toId}
   console.log(data);
    const arr = await Chat.findAll({
      where: {
        [Op.or]: [
          { fromId: data.fromId, toId: data.toId },
          { toId: data.fromId, fromId: data.toId },
        ],
      },
    });
    console.log(arr);
    this.socket.emit("sendMessage", arr);
  }
}

module.exports = { SocketController };
