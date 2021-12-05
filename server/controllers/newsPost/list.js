const { newsPost, user } = require("../../models");
const { verify } = require("jsonwebtoken");

module.exports = async (req, res) => {
  const cookie = req.cookies.accesstoken;
  const list = await newsPost.findAll({ include: [{ model: user, attributes: ["nickname", "address"] }] });
  if (!cookie) {
    return res.status(200).json({ data: list, message: "ok" });
  } else {
    await verify(cookie, process.env.ACCESS_SECRET, async (err, data) => {
      if (err) {
        return res.status(403).json({ message: "invalid cookie. retry signin" });
      }
      const userInfo = await user.findOne({
        where: { id: data.id },
      });
      if (userInfo.address === null) {
        return res.status(400).json({ message: "input address" }).rediect(`${process.env.ORIGIN}/mypage`);
      }
      return res.status(200).json({ data: list, message: "ok" });
    });
  }
}