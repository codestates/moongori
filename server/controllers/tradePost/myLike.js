const { like, tradePost, user } = require("../../models");

module.exports = async (req, res) => {
  const id = req.cookies.id;
  try {
    const list = await like.findAll({
      where: { user_Id: id },
      include: [{ model: tradePost, include: [{ model: like }] }, { model: user, attributes: ["town"] }]
    });
    return res.status(200).json({ data: list, message: "successful get likes" });
  } catch (err) {
    return res.status(500).json({ data: err, message: 'error' });
  }
}