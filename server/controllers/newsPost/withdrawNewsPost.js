const { newsPost, comment } = require("../../models");

module.exports = async (req, res) => {
  const id = req.cookies.id;
  const postId = req.params.id;

  const postOne = await newsPost.findOne({
    where: { id: postId },
  });
  if (postOne.user_Id !== id) {
    return res.status(403).json({ message: "not correspond user" });
  }
  try {
    await newsPost.destroy({
      where: { id: postId },
    });
    // 게시글 삭제할 때 게시글에 있는 댓글도 삭제
    return res.status(200).json({ message: "success withdrawal" });
  } catch (err) {
    return res.status(500).json({ message: "error" });
  }
};
