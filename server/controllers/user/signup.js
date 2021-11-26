const { user } = require("../../models");
const CryptoJS = require("crypto-js");

module.exports = async (req, res) => {

    const { email, nickname, address, password } = req.body;
    const saltIssue = CryptoJS.lib.WordArray.random(128 / 8);
    const salt = saltIssue.toString(CryptoJS.enc.Base64);
    const encrypted = CryptoJS.PBKDF2(password, salt, {
        keySize: 512 / 32,
        iterations: 1000,
    });
    const encryptedPW = encrypted.toString(CryptoJS.enc.Base64);

    await user.create({
        email,
        nickname,
        address,
        password: encryptedPW,
        salt,
    }).then((data) => {
        res.send("ok")
    }).catch((err) => {
        console.log(err)
    })


}