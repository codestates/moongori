const { user } = require("../../models");
const { verify, sign } = require("jsonwebtoken");

module.exports = async (req, res) => {
  const id = req.cookies.id;
  const { nickname, address, town } = req.body;
  try {
    if (nickname) {
      await user.update({ nickname: nickname }, { where: { id: id } });
    }
    if (address) {
      await user.update(
        { address: address, town: town },
        { where: { id: id } }
      );
    }
    if (req.file) {
      await user.update({ img: req.file.location }, { where: { id: id } });
    }
    const userInfo = await user.findOne({
      where: id,
      attributes: [
        "id",
        "nickname",
        "email",
        "address",
        "town",
        "img",
        "authState",
        "reliability",
      ],
    });
    const token = sign(userInfo.dataValues, process.env.ACCESS_SECRET, {
      expiresIn: "1d",
    });
    return res
      .status(200)
      .cookie("accesstoken", token, {
        sameSite: "None",
        httpOnly: true,
        secure: true,
      })
      .json({ data: userInfo, message: "successful modify info" });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: err });
  }
};
