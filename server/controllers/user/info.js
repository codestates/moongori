const { user } = require("../../models");

module.exports = async (req, res) => {
  const id = req.cookies.id;

  try {
    const userInfo = await user.findOne({
      where: {
        id: id,
      },
      attributes: [
        "id",
        "email",
        "nickname",
        "img",
        "address",
        "latitude",
        "longitude",
        "reliability",
        "createdAt",
        "updatedAt",
        "town",
      ],
    });
    return res.status(200).json({ data: userInfo });
  } catch (err) {
    return res.status(500).json({ data: err, massage: "error" });
  }
};
