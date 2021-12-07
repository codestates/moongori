const { user, suggestion, tradePost } = require("../../models");
const sequelize = require("sequelize");
const Op = sequelize.Op;

module.exports = async (req, res) => {
  const id = req.cookies.id;

  try {
    const payload = {
      cost: req.body.cost,
      tradePost_Id: req.body.tradePost_Id,
      user_Id: id,
    };
    await suggestion.create(payload);
    const costAll = await suggestion.max("cost", {
      where: { tradePost_Id: payload.tradePost_Id },
    });
    await tradePost.update(
      { cCost: costAll },
      { where: { id: req.body.tradePost_Id } }
    );
    const updateSuggestion = await suggestion.findAll({
      where: { tradePost_Id: req.body.tradePost_Id },
      include: { model: user, attributes: ["nickname", "town", "img"] },
    });

    return res
      .status(201)
      .json({
        data: { updateSuggestion, currentCost: costAll },
        message: "create",
      });
  } catch (err) {
    return res.status(500).json({ data: err, message: "error" });
  }
};
