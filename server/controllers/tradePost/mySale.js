const { tradePost, user, like } = require("../../models");

module.exports = async (req, res) => {
  const id = req.cookies.id;

  try {
    const saleList = await tradePost.findAll({
      where: { user_Id: id, state: 3 },
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
