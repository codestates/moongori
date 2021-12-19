const express = require("express");
const app = express();
require("dotenv").config();
const PORT = 80;
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
