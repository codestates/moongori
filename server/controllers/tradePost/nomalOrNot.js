const { tradePost, user } = require("../../models");

module.exports = async (req, res) => {
  const { nomalOrNot } = req.params;
  const list = await tradePost.findAll({
    where: { nomalOrNot: nomalOrNot },
    include: [{ model: user, attributes: ["address"] }],
  });
  return res.status(200).json({ data: list });
};
