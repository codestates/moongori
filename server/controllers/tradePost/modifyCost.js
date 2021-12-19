const { suggestion, user, tradePost } = require("../../models");

module.exports = async (req, res) => {
  const id = req.cookies.id;
  const suggestionId = req.params.id;

  try {
    const suggestionInfo = await suggestion.findOne({
      where: { id: suggestionId },
    });
    if (suggestionInfo.user_Id !== id) {
      return res.status(403).json({ message: "It's not a user who wrote it." });
    }
    await suggestion.update(
      { cost: req.body.cost },
      {
        where: {
          id: suggestionId,
        },
      }
    );

    const costAll = await suggestion.max("cost", {
      where: { tradePost_Id: req.body.tradePost_Id },
    });
    await tradePost.update(
      { cCost: costAll },
      { where: { id: req.body.tradePost_Id } }
    );

    const updateSuggestion = await suggestion.findAll({
      where: { tradePost_Id: req.body.tradePost_Id },
      include: { model: user, attributes: ["nickname", "town", "img"] },
    });
    return res.status(200).json({
      data: { updateSuggestion, currentCost: costAll },
      message: "modify comment!",
    });
  } catch (err) {
    return res.status(500).json({ message: "error" });
  }
};
