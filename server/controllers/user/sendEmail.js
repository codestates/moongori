const nodemailer = require("nodemailer");
//email 요청시 html 꾸미는것 sweatmate

module.exports = (res, data) => {
  try {
    let transporter = nodemailer.createTransport({
      service: "Naver",
      host: `stmp.naver.com`,
      port: 587,
      secure: false,
      auth: {
        user: process.env.USER_EMAIL,
        pass: process.env.USER_PASSWORD,
      },
      tls: {
        rejectUnauthorized: false,
      },
    });
    let message = {
      from: process.env.USER_EMAIL,
      to: data,
      subject: `동네문의 방문을 환영합니다.`,
      html: `<div style='
      text-align: center; 
      width: 50%; 
      height: 60%;
      margin: 15%;
      padding: 20px;
      box-shadow: 1px 1px 3px 0px #999;
      '><h2>동네문을 찾아주셔서 감사합니다.</h2>
      <a href="${process.env.PORT}/cert/${data}" ><button>이메일 인증</button></a></div>
      `,
    };
    transporter.sendMail(message, (err, info) => {
      if (err) {
        return res.status(400).send(err);
      } else {
        return res.status(200).json({ mailSuccessed: true });
      }
    });
  } catch (err) {
    return res.status(400).send(err);
  }
};
