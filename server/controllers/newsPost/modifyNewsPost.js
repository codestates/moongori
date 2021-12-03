const { newsPost } = require("../../models");
const { verify } = require("jsonwebtoken");

module.exports = async (req, res) => {
  const postId = req.params.id;
  const cookie = req.cookies.accesstoken;

  if (!cookie) {
    return res.status(403).json({ message: "no exist cookie" });
  } else {
    const verified = verify(cookie, process.env.ACCESS_SECRET);
    if (!verified) {
      return res.status(403).json({ message: "invalid cookie" });
    } else {
      try {
        const { category, content, location, img } = req.body;
        const payload = { category, content, location, img };
        let modification = await newsPost.update(payload, { where: { id: postId } });
        modification = await newsPost.findOne({ where: { id: postId } });
        return res.status(200).json({ data: modification, message: "successful modification" });
      } catch (err) {
        return res.status(500).json({ message: "error" });
      }
    }
  }
}