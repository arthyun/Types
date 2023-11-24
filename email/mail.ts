const nodeMailer = require('nodemailer');
const userInfo = require('./config/userInfo.json');

// Types
interface Param {
  toEmail: string;
  subject: string;
  text: string;
}

// 메일발송 객체
const mailContainer = {
  // 메일발송 함수
  sendGmail: function (param: Param) {
    var transporter = nodeMailer.createTransport({
      service: 'gmail', // 메일 보내는 곳
      prot: 587,
      host: 'smtp.gmlail.com',
      secure: false,
      requireTLS: true,
      auth: {
        user: userInfo.user, // 보내는 메일의 주소
        pass: userInfo.pass // 보내는 메일의 비밀번호
      }
    });
    // 메일 옵션
    var mailOptions = {
      from: userInfo.user, // 보내는 메일의 주소
      to: param.toEmail, // 수신할 이메일
      subject: param.subject, // 메일 제목
      text: param.text // 메일 내용
    };

    // 메일 발송
    transporter.sendMail(mailOptions, function (error: any, info: { response: string }) {
      if (error) {
        console.log(error);
      } else {
        console.log('Email sent: ' + info.response);
      }
    });
  }
};

module.exports = mailContainer;
