const { verify } = require("jsonwebtoken");
module.exports = (req, res) => {
  const cookie = req.cookies.accesstoken;
  if (!cookie) {
    return res.status(403).json({ message: "fail" });
  } else {
    const verified = verify(cookie, process.env.ACCESS_SECRET);
    if (!verified) {
      return res.status(403).json({ message: "invalid cookie" });
    } else {
      try {
        return res
          .clearCookie("accesstoken")
          .status(205)
          .json({ message: "signout successfully" });
      } catch {
        return res.status(500).json({ message: "server error" });
      }
    }
  }
};
