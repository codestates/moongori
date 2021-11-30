const { sign } = require("jsonwebtoken");
const { user } = require("../../models");
require("dotenv").config();
const axios = require("axios");

module.exports = async (req, res) => {
  const code = req.query.code;

  try {
    // 카카오 로그인
    const result = await axios.post(
      `https://kauth.kakao.com/oauth/token?grant_type=authorization_code&client_id=${process.env.KAKAO_REST_API_KEY}&redirect_uri=${process.env.KAKAO_REDIRECT_URI}&code=${code}`
    );
    // console.log("result.;;;;", result.data.access_token);

    const userInfo = await axios.get(`https://kapi.kakao.com/v2/user/me`, {
      headers: {
        Authorization: `Bearer ${result.data.access_token}`,
      },
    });
    console.log("userInfo.;;;;", userInfo.data.kakao_account);

    const [findUser, exist] = await user.findOrCreate({
      where: {
        email: userInfo.data.kakao_account.email,
      },
      defaults: {
        nickname: userInfo.data.kakao_account.email.split("@")[0],
        email: userInfo.data.kakao_account.account_email,
        img: userInfo.data.kakao_account.profile.is_default_image
          ? null
          : userInfo.data.kakao_account.profile.profile_image_url,
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
    console.error(error);
    return res.status(501).json({ message: "서버에러 입니다." });
  }
};
