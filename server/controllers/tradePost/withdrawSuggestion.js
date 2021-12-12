const { suggestion, tradePost, user } = require("../../models");

module.exports = async (req, res) => {
  const id = req.cookies.id;
  const postId = req.params.id;
  console.log(`########`, postId);
  const postOne = await suggestion.findOne({
    where: { id: postId },
  });
  if (postOne.user_Id !== id) {
    return res.status(403).json({ message: "not correspond user" });
  }

  try {
    await suggestion.destroy({
      where: { id: postId },
    });

    const costAll = await suggestion.max("cost", {
      where: { tradePost_Id: req.body.tradePost_Id },
    });
    await tradePost.update(
      { cCost: costAll },
      { where: { id: req.body.tradePost_Id } }
    );
    const list = await suggestion.findAll({
      where: { tradePost_Id: req.body.tradePost_Id },
      include: [{ model: user, attributes: ["nickname", "town", "img"] }],
    });
    return res
      .status(200)
      .json({
        data: { list, currentCost: costAll },
        message: "successful withdrawal",
      });
  } catch (err) {
    return res.status(500).json({ message: "error" });
  }
};
