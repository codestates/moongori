const { newsPost, user } = require("../../models");

module.exports = async (req, res) => {
  const id = req.cookies.id;
  console.log(id);
  try {
    const list = await newsPost.findAll({
      where: { user_Id: id },
      attributes: [
        "id",
        "category",
        "content",
        "town",
        "comment_cnt",
        "createdAt",
        "view",
      ],
      include: [{ model: user, attributes: ["nickname", "town"] }],
    });
    return res.status(200).json({ data: list, message: "ok" });
  } catch (err) {
    return res.status(500).json({ data: err, message: "error" });
  }
};
