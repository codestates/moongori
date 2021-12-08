const { tradePost, user, like } = require("../../models");

module.exports = async (req, res) => {

  const id = req.cookies.id;
  try {
    const list = await tradePost.findAll({
      where: { user_Id: id },
      include: [{ model: user, attributes: ["town"] }]
    })
    return res.status(200).json({ data: list, message: "successful get list" });

  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: "error" });
  }

}