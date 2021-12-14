const { user } = require("../../models");

module.exports = async (req, res) => {
  const id = req.cookies.id;
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
      "reliability",
      "createdAt",
      "updatedAt",
      "town",
    ],
  });
  return res.status(200).json({ data: userInfo });
};
