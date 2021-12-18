const { user } = require("../../models");
const CryptoJS = require("crypto-js");

module.exports = async (req, res) => {
  const id = req.cookies.id;

  try {
    const { currentPassword, modifyPassword } = req.body;
    const userInfo = await user.findOne({ where: { id: id } });
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
        { where: { id: id } }
      );
      return res.status(200).json({ message: "ok" });
    } else {
      return res.status(403).json({ message: "password fail to modify" });
    }
  } catch (err) {
    return res.status(500).json({ data: err, massage: "error" });
  }
};
