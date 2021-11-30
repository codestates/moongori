const { user } = require("../../models");

module.exports = async (req, res) => {
  const { nickname } = req.body;
  const check = await user.findOne({ where: { nickname: nickname } });
  if (check) {
    return res.status(403).json({ message: "conflict nickname" });
  } else {
    return res.status(200).json({ message: "ok" });
  }
}