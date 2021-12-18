const { room, roomJoin, user, tradePost } = require("../../models");
const { Op } = require("sequelize");

module.exports = async (req, res) => {
  const id = req.cookies.id;

  const chatList = await roomJoin.findAll({
    where: {
      user_Id: id,
    },
    include: [
      {
        model: room,
        attributes: ["tradePost_Id", "id"],
        include: [
          {
            model: tradePost,
            attributes: ["title"],
          },
        ],
      },
    ],
    order: [["createdAt", "DESC"]],
  });

  const opponentInfo = [];
  for (let chat of chatList) {
    const opponent = await roomJoin.findOne({
      where: {
        room_Id: chat.room.id,
        user_Id: {
          [Op.not]: id,
        },
      },
      include: [
        {
          model: user,
          attributes: ["nickname", "img"],
        },
      ],
      order: [["createdAt", "DESC"]],
    });
    console.log(opponent);
    opponentInfo.push(opponent);
  }
  console.log("#######", opponentInfo);

  res.status(200).json({ chatList, opponentInfo });
};
