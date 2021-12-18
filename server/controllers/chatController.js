const { tradePost, user, chat } = require("../models");

module.exports = async (io) => {
  io.on("connection", (socket) => {
    let roomId;
    socket.on("get_room", async (roomNum, userName, userId) => {
      roomId = roomNum;
      console.log(`#######room`, roomNum);
      socket["nickname"] = userName;
      socket.join(roomNum);

      const allChat = await chat.findAll({
        include: [{ model: user, attributes: ["nickname", "img"] }],
        order: [["createdAt"]],
        where: { room_Id: roomNum },
      });
      socket.emit("messagesAll", allChat);
      socket.to(roomNum).emit("welcome", [allChat, socket.nickname]);
    });

    socket.on("message", ({ nickname, userId, message, roomNum }) => {
      chat
        .create({
          message: message,
          user_Id: userId,
          room_Id: roomNum,
        })
        .then((res) => {
          user
            .findOne({
              attributes: ["img"],
              where: { id: res.user_Id },
            })
            .then((res) => {
              io.to(roomNum).emit("message", {
                userId,
                nickname,
                message,
                img: res,
              });
            });
        });
    });
    socket.on("disconnect", async () => {
      socket.to(roomId).emit("bye", socket.nickname);
    });

    //
  });
};
