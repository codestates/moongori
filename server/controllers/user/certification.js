const { user } = require("../../models");

module.exports = async (req, res) => {
  const { email } = req.params;
  try {
    await user.update(
      { authState: 1 },
      {
        where: { email: email },
      }
    );
    return res.redirect(process.env.ORIGIN).status(200).json({ message: "successful email auth" })
  } catch (err) {
    return res.status(500).json({ data: err, massage: "error" })
  }
};
