const { comment } = require("../../models");
const { verify } = require("jsonwebtoken");

module.exports = async (req, res) => {

  const cookie = req.cookies.accesstoken;
  const commentId = req.params.id;
  if (!cookie) {
    return res.status(403).json({ message: "no exist cookie" });
  } else {
    const verified = verify(cookie, process.env.ACCESS_SECRET);
    if (!verified) {
      return res.status(403).json({ message: "invalid cookie. retry sign in" });
    } else {
      try {
        const commentInfo = await comment.findOne({
          where: { id: commentId }
        });
        if (commentInfo.user_Id !== verified.id) {
          return res.status(403).json({ message: "It's not a user who wrote it." });
        }
        await comment.update({ comment: req.body.comment }, {
          where: {
            id: commentId
          }
        });
        const payload = {
          id: commentId,
          user_Id: verified.id,
          newsPost_Id: commentInfo.newsPost_Id,
          comment: req.body.comment
        };
        return res.status(200).json({ data: payload, message: "modify comment!" });
      } catch (err) {
        return res.status(500).json({ message: "error" });
      }
    }
  }
}