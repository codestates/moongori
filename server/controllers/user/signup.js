const { user } = require("../../models");
const CryptoJS = require("crypto-js");
const sendEmail = require("./sendEmail");

module.exports = async (req, res) => {
  const { email, nickname, address, town, password, latitude, longitude } =
    req.body;
  const saltIssue = CryptoJS.lib.WordArray.random(128 / 8);
  const salt = saltIssue.toString(CryptoJS.enc.Base64);
  const encrypted = CryptoJS.PBKDF2(password, salt, {
    keySize: 512 / 32,
    iterations: 1000,
  });
  const encryptedPW = encrypted.toString(CryptoJS.enc.Base64);
  try {
    await user
      .create({
        email,
        nickname,
        address,
        town,
        latitude,
        longitude,
        password: encryptedPW,
        salt,
      })
      .then((data) => {
        sendEmail(res, email);
      })
      .catch((err) => {
        console.log(err);
      });
  } catch (err) {
    return res.status(500).json({ data: err, message: "error" });
  }
};
