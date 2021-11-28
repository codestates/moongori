const { user } = require("../../models");
const { verify } = require("jsonwebtoken");

module.exports = async (req, res) => {
  console.log("req.cookies;;;", req.cookies);
  const token = req.cookies.accesstoken;
  if (!token) {
    return res.status(403).json({ message: "fail" });
  } else {
    const verified = verify(token, process.env.ACCESS_SECRET);
    if (!verified) {
      return res.status(403).json({ message: "invalid token" });
    } else {
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
          "reliability",
          "createdAt",
          "updatedAt",
        ],
      });
      return res.status(200).json({ data: userInfo });
    }
  }
};
