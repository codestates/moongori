const { user } = require("../../models");
const { verify } = require("jsonwebtoken");
const CryptoJS = require("crypto-js");

module.exports = async (req, res) => {
  const cookie = req.cookies.accesstoken;
  const verified = verify(cookie, process.env.ACCESS_SECRET);
  if (!verified) {
    return res.status(403).json({ message: "invalid cookie" });
  } else {
    const { currentPassword, modifyPassword } = req.body;
    const userInfo = await user.findOne({ where: { id: verified.id } });
    const { salt, password } = userInfo.dataValues;

    const encrypted = CryptoJS.PBKDF2(currentPassword, salt, {
      keySize: 512 / 32,
      iterations: 1000,
    });
    const encryptedPW = encrypted.toString(CryptoJS.enc.Base64);

    if (password === encryptedPW) {
      const saltIssue = CryptoJS.lib.WordArray.random(128 / 8);
      const newSalt = saltIssue.toString(CryptoJS.enc.Base64);
      const newEncrypted = CryptoJS.PBKDF2(modifyPassword, newSalt, {
        keySize: 512 / 32,
        iterations: 1000,
      });
      const newEncryptedPW = newEncrypted.toString(CryptoJS.enc.Base64);
      await user.update(
        { password: newEncryptedPW, salt: newSalt },
        { where: { id: verified.id } }
      );
      return res.status(200).json({ message: "ok" });
    } else {
      return res.status(403).json({ message: "password fail to modify" });
    }
  }
};
