const { like } = require("../../models");

module.exports = async (req, res) => {
  const id = req.cookies.id;
  const { tradePost_Id } = req.body;

  await like.create({ user_Id: id, tradePost_Id });
  const like_cnt = await like.findAll({
    where: { tradePost_Id }
  });
  return res.status(200).json({ data: like_cnt.length, message: "like!!!" });
}