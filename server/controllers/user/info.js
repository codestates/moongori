const { user } = require("../../models");
const { verify } = require("jsonwebtoken");

module.exports = async (req, res) => {
  const cookie = req.cookies.accesstoken;

  if (!cookie) {
    return res.status(403).json({ message: "fail" });
  } else {
    const verified = verify(cookie, process.env.ACCESS_SECRET);
    if (!verified) {
      return res.status(403).json({ message: "invalid cookie" });
    } else {
      try {
        const userInfo = await user.findOne({
          where: {
            id: verified.id,
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
    }
  }
};
