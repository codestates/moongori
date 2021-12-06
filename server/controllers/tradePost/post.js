const { tradePost, user, suggestion } = require("../../models");

module.exports = async (req, res) => {
  const postId = req.params.id;

  const postInfo = await tradePost.findOne({
    where: { id: postId },
    include: [
      {
        model: suggestion,
        attributes: ["cost"],
        include: { model: user, attributes: ["nickname", "address", "img"] },
      },
    ],
  });
  return res.status(200).json({ data: postInfo });
};
