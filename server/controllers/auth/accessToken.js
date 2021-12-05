const { sign, verify } = require("jsonwebtoken");
const { user } = require("../../models");

exports.accessToken = async (req, res, next) => {
  const cookie = req.cookies.accesstoken;
  if (!cookie) {
    return res.status(403).json({ message: "no exist cookie" });
  }
  await verify(cookie, process.env.ACCESS_SECRET, async (err, data) => {
    if (err) {
      return res.status(403).json({ message: "invalid cookie. retry signin" });
    }
    const userInfo = await user.findOne({
      where: { id: data.id },
    });
    if (!userInfo) {
      return res.status(400).json({ message: "no exist user" });
    }
    req.cookies.id = userInfo.id;
    next();
    // delete userInfo.dataValues.password;
    // delete userInfo.dataValues.salt;
    // const payload = userInfo.dataValues;
    // const token = await sign(payload, process.env.ACCESS_SECRET, {
    //   expiresIn: "1d",
    // });
    // res.status(200).cookie("accesstoken", token, {
    //   sameSite: "None",
    //   httpOnly: true,
    //   secure: true,
    // }).json({ message: "new cookie" });
  }
  )
}