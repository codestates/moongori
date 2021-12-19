const { comment, user, newsPost } = require("../../models");

module.exports = async (req, res) => {
  const id = req.cookies.id;
  const commentId = req.params.id;
  const commentOne = await comment.findOne({
    where: { id: commentId },
  });
  if (commentOne.user_Id !== id) {
    return res.status(403).json({ message: "not correspond user" });
  }
  try {
    await comment.destroy({
      where: { id: commentId },
    });
    const updateComment = await comment.findAll({
      where: { newsPost_Id: req.body.newsPost_Id },
      include: { model: user, attributes: ["nickname", "town", "img"] },
    });
    await newsPost.update(
      { comment_cnt: updateComment.length },
      { where: { id: req.body.newsPost_Id } }
    );
    return res
      .status(200)
      .json({ data: updateComment, message: "success withdrawal" });
  } catch (err) {
    return res.status(500).json({ message: "error" });
  }
};
