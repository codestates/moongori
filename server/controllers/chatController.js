const { tradePost, user, chat } = require("../models");

module.exports = async (io) => {
  io.on("connection", (socket) => {
    socket.on("get_room", (roomNum, userName, userId) => {
      socket["nickname"] = userName;
      console.log(";;;;;;;;;;;", typeof roomNum);
      socket.join(roomNum);

      chat
        .findAll({
          include: [{ model: user, attributes: ["nickname"] }],
          order: [["createdAt"]],
          where: { suggestion_Id: roomNum },
        })
        .then((res) => {
          socket.emit("messagesAll", res);
        });
      socket.to(roomNum).emit("welcome", socket.nickname);
    });

    socket.on("message", ({ nickname, userId, message, roomNum }) => {
      chat
        .create({
          content: message,
          user_Id: userId,
          suggestion_Id: roomNum,
        })
        .then(() => {
          io.to(roomNum).emit("message", { nickname, message });
        });
    });
  });
};
