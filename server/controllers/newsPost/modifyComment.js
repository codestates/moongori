const { comment, user } = require("../../models");

module.exports = async (req, res) => {
  const id = req.cookies.id;
  const commentId = req.params.id;

  try {
    const commentInfo = await comment.findOne({
      where: { id: commentId },
    });
    if (commentInfo.user_Id !== id) {
      return res.status(403).json({ message: "It's not a user who wrote it." });
    }
    await comment.update(
      { comment: req.body.comment },
      {
        where: {
          id: commentId,
        },
      }
    );

    const updateComment = await comment.findAll({
      where: { newsPost_Id: req.body.newsPost_Id },
      include: { model: user, attributes: ["nickname", "town", "img"] },
    });

    return res
      .status(200)
      .json({ data: updateComment, message: "modify comment!" });
  } catch (err) {
    return res.status(500).json({ message: "error" });
  }
};
