const { newsPost, user } = require("../../models");

module.exports = async (req, res) => {
  const id = req.cookies.id;
  const userInfo = await user.findOne({
    where: { id: id },
  });
  try {
    if (req.file) {
      const img = req.file.location;
      const { category, content, location } = req.body;
      const payload = {
        category,
        content,
        location: location || null,
        town: userInfo.town,
        img,
        user_Id: id,
      };
      const createPost = await newsPost.create(payload);
      console.log("!!!!!", createPost);
      const updatePost = await newsPost.findOne({
        where: { id: createPost.id },
      });
      console.log("@@@@@@", updatePost);
      return res.status(201).json({ data: updatePost, message: "create" });
    } else {
      const { category, content, location } = req.body;
      const payload = {
        category,
        content,
        location: location || null,
        town: userInfo.town,
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
