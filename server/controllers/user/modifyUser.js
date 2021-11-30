const { user } = require("../../models");
const { verify } = require("jsonwebtoken");

module.exports = async (req, res) => {
  const cookie = req.cookies.accesstoken;
  const { nickname, img, address } = req.body;
  console.log(nickname, address);

  if (!cookie) {
    return res.status(403).json({ message: "fail" });
  } else {
    const verified = verify(cookie, process.env.ACCESS_SECRET);
    if (!verified) {
      return res.status(403).json({ message: "invalid cookie" })
    }
    try {
      if (nickname) {
        await user.update({ nickname: nickname }, { where: { id: verified.id } });
      }
      if (address) {
        await user.update({ address: address }, { where: { id: verified.id } });
      }
      if (img) {
        await user.update({ img: img }, { where: { id: verified.id } });
      }
      const userInfo = await user.findOne({ where: verified.id })
      return res.status(200).json({ data: userInfo, message: "successful modify info" });
    } catch (err) {
      console.log(err);
      return res.status(500).json({ message: err })
    }

  }
}