const { like, tradePost } = require("../../models");

module.exports = async (req, res) => {
  const id = req.cookies.id;
  const { tradePost_Id } = req.body;
  try {
    await like.create({ user_Id: id, tradePost_Id });
    const like_cnt = await like.findAll({
      where: { tradePost_Id },
    });
    await tradePost.update(
      { likes_cnt: like_cnt.length },
      { where: { id: tradePost_Id } }
    );
    return res.status(200).json({ data: like_cnt.length, message: "like!!!" });
  } catch (err) {
    return res.status(500).json({ data: err, message: 'error' });
  }
};
