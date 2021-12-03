const { newsPost } = require("../../models");
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
      const { category, content, location, img } = req.body;
      const payload = {
        category,
        content,
        location,
        img,
        user_Id: verified.id
      }
      try {
        const createPost = await newsPost.create(payload);
        const updatePost = await newsPost.findOne({
          where: { id: createPost.id }
        });
        return res.status(201).json({ data: updatePost, message: "create" });
      } catch (err) {
        return res.status(500).json({ message: "error" });
      }
    }
  }
}