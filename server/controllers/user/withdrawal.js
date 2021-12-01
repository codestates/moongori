const { user } = require("../../models");
const { verify } = require("jsonwebtoken");

module.exports = (req, res) => {
  console.log(req.cookies);
  const cookie = req.cookies.accesstoken;
  if (!cookie) {
    return res.status(403).json({ message: "fail" });
  } else {
    const verified = verify(cookie, process.env.ACCESS_SECRET);
    if (!verified) {
      return res.status(403).json({ message: "invalid cookie" });
    } else {
      try {
        user.destroy({ where: { id: verified.id } });
        return res
          .clearCookie("accesstoken")
          .status(204)
          .json({ message: "successful withdraw" });
      } catch {
        return res.status(500).json({ message: "error server" });
      }
    }
  }
};
