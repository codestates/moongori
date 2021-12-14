const { like, tradePost, user } = require("../../models");

module.exports = async (req, res) => {
  const id = req.cookies.id;

  const list = await like.findAll({
    where: { user_Id: id },
    include: [{ model: tradePost, include: [{ model: like }] }, { model: user, attributes: ["town"] }]
  });
  return res.status(200).json({ data: list, message: "successful get likes" });
}