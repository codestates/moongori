const { comment, newsPost } = require("../../models");
const { verify } = require("jsonwebtoken");

module.exports = async (req, res) => {

  const cookie = req.cookies.accesstoken;
  if (!cookie) {
    return res.status(403).json({ message: "no exist cookie" });
  } else {
    const verified = verify(cookie, process.env.ACCESS_SECRET);
    if (!verified) {
      return res.status(403).json({ message: "invalid cookie" });
    } else {
      try {
        const payload = {
          newsPost_Id: req.body.newsPost_Id,
          comment: req.body.comment,
          user_Id: verified.id
        }
        await comment.create(payload);
        const updateComment = await comment.findAll({
          where: { newsPost_Id: req.body.newsPost_Id }
        });
        await newsPost.update({ comment_cnt: updateComment.length }, { where: { id: req.body.newsPost_Id } })
        return res.status(201).json({ data: updateComment, message: "create" });
      } catch (err) {
        return res.status(500).json({ message: "error" });
      }
    }
  }
}