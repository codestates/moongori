const { user } = require("../../models");

module.exports = async (req, res) => {
  const { email } = req.params;
  await user.update(
    { authState: 1 },
    {
      where: { email: email },
    }
  );
  res.redirect(process.env.ORIGIN);
  //.status(200).json({ message: "successful email auth" })
};
