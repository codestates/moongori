const { tradePost, user, chat } = require("../models");

module.exports = async (io) => {
  io.on("connection", (socket) => {
    socket.on("get_room", async (roomNum, userName, userId) => {
      socket["nickname"] = userName;
      socket.join(roomNum);
      console.log("@@@@@@@@@@@@", roomNum, userName, userId);
    });

    socket.on("message", async (nickname, userId, message, roomNum) => {
      console.log("%%%%%%%%%%%%%%", nickname, userId, message, roomNum);
      await chat.create({
        user_Id: userId,
        tradePost_Id: roomNum,
        content: message,
      });
    });
  });
};
