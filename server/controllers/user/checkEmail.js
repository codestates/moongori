const { user } = require("../../models");

module.exports = async (req, res) => {
  const { email } = req.body;
  const check = await user.findOne({ where: { email: email } });
  if (check) {
    return res.status(403).json({ message: "conflict email" });
  } else {
    return res.status(200).json({ message: "ok" });
  }
}