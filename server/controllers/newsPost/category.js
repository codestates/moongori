const { newsPost, user } = require("../../models");

module.exports = async (req, res) => {
  const { category } = req.params;
  const list = await newsPost.findAll({
    where: { category: category },
    include: [{ model: user, attributes: ["nickname", "town"] }],
  });
  return res.status(200).json({ data: list });
};
