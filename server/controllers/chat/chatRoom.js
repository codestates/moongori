const { room, roomJoin, user, tradePost } = require("../../models");
const { Op } = require("sequelize");

module.exports = async (req, res) => {
  try {
    const id = req.cookies.id;
    const roomId = req.params.roomId;

    const postInfo = await room.findOne({
      where: {
        id: roomId,
      },
      include: [
        {
          model: tradePost,
          // attributes: ["title", "img", "sCost", "state", "id"]
        },
      ],
    });

    return res.status(200).json({ data: postInfo, message: "ok" });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ data: err, message: "error" });
  }
};
