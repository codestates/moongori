const { sign } = require("jsonwebtoken");
const { user } = require("../../models");
const CryptoJS = require("crypto-js");

module.exports = async (req, res) => {

  const userInfo = await user.findOne({
    where: {
      email: req.body.email
    }
  })
  if (!userInfo) {
    return res.status(403).json({ message: "no exist user" });
  }
  const { id, email, nickname, address, salt, img, reliability, password } = userInfo.dataValues;

  //패스워드 체크
  const encrypted = CryptoJS.PBKDF2(req.body.password, salt, {
    keySize: 512 / 32,
    iterations: 1000,
  });
  const encryptedPW = encrypted.toString(CryptoJS.enc.Base64);

  if (password === encryptedPW) {
    const payload = {
      id, email, img, address, nickname, reliability,
    };
    const token = sign(payload, process.env.ACCESS_SECRET, { expiresIn: "1d" });
    return res.status(200).cookie('accesstoken', token, {
      maxAge: 24 * 6 * 60 * 10000,
      sameSite: "None",
      httpOnly: true,
      secure: true,
    }).send("ok");
  } else {
    return res.status(403).json({ message: "fail" });
  }
}