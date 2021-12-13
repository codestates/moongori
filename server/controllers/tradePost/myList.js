const { tradePost, user, like } = require("../../models");

module.exports = async (req, res) => {
  console.log(req.cookies.id);

  const id = req.cookies.id;
  try {
    const list = await tradePost.findAll({
      where: { user_Id: id },
      include: [
        { model: user, attributes: ["town"] },
        { model: like, attributes: ["user_Id"] },
      ],
    });
    return res.status(200).json({ data: list, message: "successful get list" });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: "error" });
  }
};
