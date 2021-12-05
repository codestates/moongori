const { comment } = require("../../models");
const { verify } = require("jsonwebtoken");

module.exports = async (req, res) => {
  const commentId = req.params.id;
  const cookie = req.cookies.accesstoken;
  if (!cookie) {
    return res.status(403).json({ message: "no exist cookie" });
  } else {
    const verified = verify(cookie, process.env.ACCESS_SECRET);
    if (!verified) {
      return res.status(403).json({ message: "invalid cookie" });
    } else {
      const commentOne = await comment.findOne({
        where: { id: commentId }
      });
      if (commentOne.user_Id !== verified.id) {
        return res.status(403).json({ message: "not correspond user" })
      }
      try {
        await comment.destroy({
          where: { id: commentId }
        });
        return res.status(200).json({ message: "success withdrawal" });
      } catch (err) {
        return res.status(500).json({ message: "error" });
      }
    }
  }
}