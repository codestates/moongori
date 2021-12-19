const { tradePost, user, suggestion, like } = require("../../models");

module.exports = async (req, res) => {
  const postId = req.params.id;
  try {
    const postInfo = await tradePost.findOne({
      where: { id: postId },
      include: [
        { model: user, attributes: ["nickname", "town", "img"] },
        {
          model: suggestion,
          attributes: ["cost", "id", "user_Id"],
          include: { model: user, attributes: ["nickname", "town", "img"] },
        },
        { model: like, attributes: ["user_Id"] },
      ],
    });
    return res.status(200).json({ data: { postInfo, like_cnt: postInfo.likes } });
  } catch (err) {
    console.log(err);
  }
};
