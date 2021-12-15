const { comment, newsPost, user } = require("../../models");

module.exports = async (req, res) => {
  const id = req.cookies.id;
  try {
    const list = await newsPost.findAll({
      attributes: [
        "id",
        "category",
        "content",
        "town",
        "comment_cnt",
        "createdAt",
        "view",
      ],
      include: [
        { model: user, attributes: ["nickname", "town"] },
        { model: comment, where: { user_id: id }, attributes: [] },
        // include: [{ model: user, attributes: ["nickname", "town"] }],
      ],
    });
    return res.status(200).json({ data: list, message: "ok" });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ data: err, message: "error" });
  }
};
