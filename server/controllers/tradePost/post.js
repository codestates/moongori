const { tradePost, user, suggestion, like } = require("../../models");

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
      { model: like, attributes: ["user_Id"] }
    ],
  });

  return res.status(200).json({ data: { postInfo, like_cnt: postInfo.likes.length } });
};
