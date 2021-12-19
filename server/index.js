const express = require("express");
const app = express();
require("dotenv").config();
<<<<<<< HEAD
const PORT = 80;
=======
const PORT = 4000;
>>>>>>> aba012370520541f1567a557f004412bb0403447
const cookieParser = require("cookie-parser");
const controllers = require("./controllers");
const cors = require("cors");
const http = require("http");
const socketIo = require("socket.io");
const server = http.createServer(app);
const io = socketIo(server, { cors: { origin: "*", credentials: true } });
const chatController = require("./controllers/chatController")(io);

app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: true,
    credentials: true,
  })
);
app.set("etag", false);
app.use("/", controllers);
app.get("/", (req, res) => {
  res.status(200).send("Hello sever World!");
});

module.exports = server.listen(PORT, () => {
  console.log(`this server listening on: ${PORT}/`);
});
