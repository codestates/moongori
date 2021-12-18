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
      display:flex;
      flex-direction:column;
      align-items: center;
      justify-content: center;
      border-radius:10px;
      border:none;
      background:#aae8c5;
      text-align: center; 
      width: 500px; 
      height: 200px;
     margin-left:30px;
     margin-top:30px;
      padding: 20px;
      box-shadow: 1px 1px 3px 0px #999;
      '>
      <h1>문고리에 방문해주셔서 감사합니다:)</h1>
      <div>아래 이메일 인증 버튼을 클릭하여 회원가입을 완료해 주세요.</div>
      <a href="${process.env.PORT}/cert/${data}" ><button style='
      margin-top:20px;
      background:white;
      border-radius:5px;
      border:1px solid #b7b7b7;
      '>이메일 인증</button></a>
      </div>
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
