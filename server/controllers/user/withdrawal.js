const { user } = require("../../models");

module.exports = (req, res) => {
  const id = req.cookies.id;
  try {
    user.destroy({ where: { id: id } });
    return res
      .clearCookie("accesstoken")
      .status(204)
      .json({ message: "successful withdraw" });
  } catch {
    return res.status(500).json({ message: "error server" });
  }
};
