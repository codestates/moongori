const { tradePost } = require("../../models");

module.exports = async (req, res) => {
  const id = req.cookies.id;
  const postId = req.params.id;
  const postOne = await tradePost.findOne({
    where: { id: postId },
  });
  if (postOne.user_Id !== id) {
    return res.status(403).json({ message: "not correspond user" });
  }
  try {
    if (req.files.length === 0) {
      const { title, content, sCost, mainIdx } = req.body;

      const preImg = postOne.img.split(",");
      if (req.body.modifyIdx) {
        for (let idx of req.body.modifyIdx) {
          preImg.splice(Number(idx), 1);
        }
      }
      let img = [...preImg, ...req.files.map((el) => el.location)];
      img = [...img.splice(Number(mainIdx), 1), ...img].join(",");

      const payload = { img, title, content, sCost };
      let modification = await tradePost.update(payload, {
        where: { id: postId },
      });
      modification = await tradePost.findOne({ where: { id: postId } });
      return res
        .status(200)
        .json({ data: modification, message: "successful modification" });
    } else {
      const { title, content, sCost, mainIdx, modifyIdx } = req.body;

      const preImg = postOne.img.split(",");
      for (let idx of modifyIdx) {
        preImg.splice(Number(idx), 1);
      }
      let img = [...preImg, ...req.files.map((el) => el.location)];
      img = [...img.splice(Number(mainIdx), 1), ...img].join(",");

      const payload = { img, title, content, sCost };
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
