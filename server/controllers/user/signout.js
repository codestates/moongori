const { verify } = require("jsonwebtoken");
module.exports = (req, res) => {
  const cookie = req.cookies.accesstoken;
  if (!cookie) {
    return res.status(403).json({ message: "fail" })
  }

}