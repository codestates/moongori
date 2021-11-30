const { sign } = require("jsonwebtoken");
const { user } = require("../../models");
require("dotenv").config();
const axios = require("axios");

module.exports = async (req, res) => {
  const code = req.query.code;
  console.log("code;;;;;", code);
  try {
    // 구글 로그인
    const result = await axios.post(
      `https://oauth2.googleapis.com/token?code=${code}&client_id=${process.env.GOOGLE_CLIENT_ID}&client_secret=${process.env.GOOGLE_CLIENT_SECRET}&redirect_uri=${process.env.CLIENT_REDIRECT_URL}&grant_type=authorization_code`
    );
    console.log("result222222222", result.data);

    const userInfo = await axios.get(
      `https://www.googleapis.com/oauth2/v2/userinfo?access_token=${result.data.access_token}`,
      {
        headers: {
          Authorization: `Bearer ${result.data.access_token}`,
        },
      }
    );
    console.log("userInfo.;;;;", userInfo.data);

    const [findUser, exist] = await user.findOrCreate({
      where: {
        email: userInfo.data.email,
      },
      defaults: {
        nickname: userInfo.data.email.split("@")[0],
        img: userInfo.data.picture,
        password: userInfo.data.id,
        salt: userInfo.data.id,
        loginType: true,
      },
    });

    const payload = {
      id: findUser.id,
      email: findUser.email,
      nickname: findUser.nickname,
      userArea: findUser.userArea,
      img: findUser.img,
      loginType: true,
    };

    const token = await sign(payload, process.env.ACCESS_SECRET, {
      expiresIn: "1d",
    });

    res.cookie("accesstoken", token, {
      maxAge: 24 * 6 * 60 * 10000,
      sameSite: "None",
      httpOnly: true,
      secure: true,
    });

    const realQuery = encodeURIComponent(token);

    res.redirect(`${process.env.ORIGIN}/?access_token=${realQuery}`);
  } catch (error) {
    // console.error("error;;;;;", error);
    return res.status(501).json({ message: "서버에러 입니다." });
  }
};
