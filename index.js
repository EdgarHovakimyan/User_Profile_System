const express = require("express");
const { router } = require("./routers");
const { user } = require("./routers/user");
const { admin } = require("./routers/admin");
const { manager } = require("./routers/manager");
const passport = require("passport");
const session = require("express-session");
const { isLogin, isLoginManager, isLoginAdmin } = require("./midellware");
const app = express();
require("dotenv").config();


const http = require("http");
const server = http.createServer(app);
const { Server } = require("socket.io");
const { SocketController } = require("./controllers/SocketController");
const io = new Server(server);

new SocketController(io);
io.on("connection", (socket) => {
  console.log("a user connected");
  console.log(socket);

  socket.on("click", (x) => {
    console.log(x);
  });

  socket.emit("send", { x: "5" });
  socket.emit("send", { x: "15" });
  socket.emit("send", { x: "25" });
});

app.set("view engine", "hbs");
require("hbs").registerPartials(__dirname + "/views/components");

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static("public"));


app.use(
  session({
    secret: "5555",
    resave: false,
    saveUninitialized: false,
  })
);

app.use(passport.initialize());
app.use(passport.session());

app.use("/", router);
app.use("/user", isLogin, user);
app.use("/manager", isLoginManager, manager);
app.use("/admin", isLoginAdmin, admin);

server.listen(process.env.PORT);
