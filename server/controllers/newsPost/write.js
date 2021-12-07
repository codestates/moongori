const { newsPost } = require("../../models");

module.exports = async (req, res) => {
  const id = req.cookies.id;

  try {
    if (req.file) {
      const img = req.file.location;
      const { category, content, location } = req.body;
      const payload = {
        category,
        content,
        location: location || null,
        img,
        user_Id: id,
      };
      const createPost = await newsPost.create(payload);
      const updatePost = await newsPost.findOne({
        where: { id: createPost.id },
      });
      return res.status(201).json({ data: updatePost, message: "create" });
    } else {
      const { category, content, location } = req.body;
      const payload = {
        category,
        content,
        location: location || null,
        user_Id: id,
      };
      const createPost = await newsPost.create(payload);
      const updatePost = await newsPost.findOne({
        where: { id: createPost.id },
      });
      return res.status(201).json({ data: updatePost, message: "create" });
    }
  } catch (err) {
    return res.status(500).json({ message: "error" });
  }
};
