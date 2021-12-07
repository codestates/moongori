const { comment, newsPost, user } = require("../../models");

module.exports = async (req, res) => {
  const id = req.cookies.id;

  const list = await newsPost.findAll({
    attributes: [
      "id",
      "category",
      "content",
      "town",
      "comment_cnt",
      "createdAt",
    ],
    include: [
      { model: user, attributes: ["nickname", "town"] },
      { model: comment, where: { user_id: id }, attributes: [] },
      // include: [{ model: user, attributes: ["nickname", "town"] }],
    ],
  });
  return res.status(200).json({ data: list, message: "ok" });
};
