const { sign } = require("jsonwebtoken");
const { user } = require("../../models");
const CryptoJS = require("crypto-js");

module.exports = async (req, res) => {
  const userInfo = await user.findOne({
    where: {
      email: req.body.email,
    },
  });
  if (!userInfo) {
    return res.status(403).json({ message: "no exist user" });
  }
  const {
    id,
    email,
    nickname,
    address,
    salt,
    img,
    reliability,
    password,
    authState,
  } = userInfo.dataValues;
  //이메일 인증 여부 확인(안된경우 이메일 인증 요청 문구 전달);
  if (authState === 0) {
    return res.status(403).json({ message: "check your certificate email " });
  }

  //패스워드 체크
  const encrypted = CryptoJS.PBKDF2(req.body.password, salt, {
    keySize: 512 / 32,
    iterations: 1000,
  });
  const encryptedPW = encrypted.toString(CryptoJS.enc.Base64);

  if (password === encryptedPW) {
    const payload = {
      id,
      email,
      img,
      address,
      nickname,
      reliability,
      authState,
    };
    const token = sign(payload, process.env.ACCESS_SECRET, { expiresIn: "3d" });
    return res
      .status(200)
      .cookie("accesstoken", token, {
        maxAge: 24 * 6 * 60 * 10000,
        sameSite: "None",
        httpOnly: true,
        secure: true,
      })
      .send("ok");
  } else {
    return res.status(403).json({ message: "fail" });
  }
};
