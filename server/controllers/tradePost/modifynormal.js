const { tradePost } = require("../../models");

module.exports = async (req, res) => {
  const id = req.cookies.id;
  const postId = req.params.id;
  console.log("!!!!!!!!!!", req.files);

  const postOne = await tradePost.findOne({
    where: { id: postId },
  });
  if (postOne.user_Id !== id) {
    return res.status(403).json({ message: "not correspond user" });
  }
  try {
    if (req.files.length > 0) {
      const img = req.files.map((el) => el.location).join(",");
      const { title, content, sCost } = req.body;
      const payload = { title, content, sCost, img };
      let modification = await tradePost.update(payload, {
        where: { id: postId },
      });
      modification = await tradePost.findOne({ where: { id: postId } });
      return res
        .status(200)
        .json({ data: modification, message: "successful modification" });
    } else {
      const { title, content, sCost } = req.body;
      const payload = { title, content, sCost };
      let modification = await tradePost.update(payload, {
        where: { id: postId },
      });
      modification = await tradePost.findOne({ where: { id: postId } });
      return res
        .status(200)
        .json({ data: modification, message: "successful modification" });
    }
  } catch (err) {
    return res.status(500).json({ message: "error" });
  }
};
