const { newsPost, user } = require("../../models");
const { verify } = require("jsonwebtoken");

module.exports = async (req, res) => {
  const cookie = req.cookies.accesstoken;
  const list = await newsPost.findAll({ include: [{ model: user, attributes: ["nickname", "address"] }] });
  if (!cookie) {
    return res.status(200).json({ data: list, message: "ok" });
  } else {
    const verified = verify(cookie, process.env.ACCESS_SECRET);
    if (verified) {
      const { address } = verified;
      if (address === null) {
        return res.status(200).json({ message: "input address" }).rediect(`${process.env.ORIGIN}/mypage`)
      }
      return res.status(200).json({ data: list, message: "ok" });
    }
  }
}