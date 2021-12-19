const { room, roomJoin } = require("../../models");
const { Op } = require("sequelize");

module.exports = async (req, res) => {
  try {
    console.log(req.body);
    const myId = req.cookies.id;

    if (req.body.normalOrNot) {
      // 제시글
      console.log("제시글", req.body);
      const { price_userId, postId } = req.body;
      const roomName = [myId, price_userId, postId].join();
      console.log(`########`);
      const [newRoom, created] = await room.findOrCreate({
        where: { roomName: roomName },
        defaults: {
          roomName: roomName,
          tradePost_Id: postId,
        },
      });
      if (created) {
        await roomJoin.create({
          user_Id: myId,
          room_Id: newRoom.id,
        });
        await roomJoin.create({
          user_Id: price_userId,
          room_Id: newRoom.id,
        });
        res.status(201).json({ message: "create chatting Room!" });
      } else {
        res.status(200).json({ message: "already exits Room!" });
      }
    } else {
      // 일반글
      console.log("일반글", req.body);
      const { tradePost_userId, postId } = req.body;
      const roomName = [myId, tradePost_userId, postId].join();

      const [newRoom, created] = await room.findOrCreate({
        where: { roomName: roomName },
        defaults: {
          roomName: roomName,
          tradePost_Id: postId,
        },
      });
      if (created) {
        await roomJoin.create({
          user_Id: myId,
          room_Id: newRoom.id,
        });
        await roomJoin.create({
          user_Id: tradePost_userId,
          room_Id: newRoom.id,
        });
        res.status(201).json({ message: "create chatting Room!" });
      } else {
        res.status(200).json({ message: "already exits Room!" });
      }
    }
  } catch (err) {
    console.log(err);
    return res.status(500).json({ data: err, message: "error" });
  }
};
