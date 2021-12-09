const { newsPost } = require("../../models");

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
    if (req.file !== undefined) {
      const img = req.file.location;
      const { category, content, location } = req.body;
      const payload = {
        category: category || postOne.category,
        content: content || postOne.content,
        location: location === "null" ? null : location || postOne.location,
        img: img || postOne.img,
      };
      await newsPost.update(payload, {
        where: { id: postId },
      });
      const modification = await newsPost.findOne({ where: { id: postId } });
      return res
        .status(200)
        .json({ data: modification, message: "successful modification" });
    } else {
      const { category, content, location, img } = req.body;
      const payload = {
        category: category || postOne.category,
        content: content || postOne.content,
        location: location === "null" ? null : location || postOne.location,
        img: img === "null" ? null : postOne.img,
      };
      await newsPost.update(payload, {
        where: { id: postId },
      });
      const modification = await newsPost.findOne({ where: { id: postId } });
      return res
        .status(200)
        .json({ data: modification, message: "successful modification" });
    }
  } catch (err) {
    return res.status(500).json({ message: "error" });
  }
};
