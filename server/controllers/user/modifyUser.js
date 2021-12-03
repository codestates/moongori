const { user } = require("../../models");
const { verify, sign } = require("jsonwebtoken");

module.exports = async (req, res) => {
  console.log(req.body);
  const cookie = req.cookies.accesstoken;
  const { nickname, address } = req.body;
  const imgs = req.files;
  // const imgs = req.files.map((el) => el.location).join(",");
  console.log(imgs);
  if (!cookie) {
    return res.status(403).json({ message: "fail" });
  } else {
    const verified = verify(cookie, process.env.ACCESS_SECRET);

    if (!verified) {
      return res.status(403).json({ message: "invalid cookie" });
    }
    try {
      if (nickname) {
        await user.update(
          { nickname: nickname },
          { where: { id: verified.id } }
        );
      }
      if (address) {
        await user.update({ address: address }, { where: { id: verified.id } });
      }
      // if (imgs.length > 0 || imgs !== undefined) {
      //   imgs = imgs[0].location;
      //   await user.update({ img: imgs }, { where: { id: verified.id } });
      // }
      console.log(verified);
      const userInfo = await user.findOne({
        where: verified.id,
        attributes: [
          "id",
          "nickname",
          "email",
          "address",
          "img",
          "authState",
          "reliability",
        ],
      });
      console.log(userInfo);
      const token = sign(userInfo.dataValues, process.env.ACCESS_SECRET, {
        expiresIn: "1d",
      });
      //console.log("userInfo-img;;;;", userInfo.dataValues.img.split(","));

      return res
        .status(200)
        .cookie("accesstoken", token, {
          maxAge: 24 * 6 * 60 * 10000,
          sameSite: "None",
          httpOnly: true,
          secure: true,
        })
        .json({ data: userInfo, message: "successful modify info" });
    } catch (err) {
      console.log(err);
      return res.status(500).json({ message: err });
    }
  }
};
