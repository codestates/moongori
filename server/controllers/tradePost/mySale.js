const { tradePost, user, like } = require("../../models");
const { Op } = require("sequelize");

module.exports = async (req, res) => {
  const id = req.cookies.id;

  try {
    const saleList = await tradePost.findAll({
      where: { user_Id: id, [Op.or]: [{ state: 3 }, { state: 5 }] },
      include: [
        { model: user, attributes: ["town"] },
        { model: like, attributes: ["user_Id"] },
      ],
    });
    return res.status(200).json({ data: saleList });
  } catch {
    return res.status(500).json({ message: "error" });
  }
};
