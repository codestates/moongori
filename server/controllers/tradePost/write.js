const { tradePost } = require("../../models");

module.exports = async (req, res) => {
  const id = req.cookies.id;

  const { title, content, sCost, img, nomalOrNot, endTime } = req.body;
  const payload = {
    title,
    content,
    sCost,
    img,
    nomalOrNot,
    endTime,
    user_Id: id,
  };
  try {
    const createPost = await tradePost.create(payload);
    const updatePost = await tradePost.findOne({
      where: { id: createPost.id },
    });
    return res.status(201).json({ data: updatePost, message: "create" });
  } catch (err) {
    return res.status(500).json({ message: "error" });
  }
};
