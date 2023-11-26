import express, { Express, Request, Response } from "express";
const app: Express = express();
const mail = require("./mail");
const port = 5000;

app.get("/", (req: Request, res: Response) => {
   res.send("Typescript + Express Server");
});

app.get("/mail", (req: Request, res: Response) => {
   //   const { email } = req.body;
   const email = "son@k2systems.kr"; // 테스트용

   let emailParam = {
      toEmail: email, // 수신할 이메일
      subject: "Email Service 관리자 메일입니다.", // 메일 제목
      text: `<h1>son@k2systems 회원님!</h1>`, // 메일 내용
   };
   mail.sendGmail(emailParam);
   return res.status(200).send("성공");
});

app.listen(port, () => {
   console.log(`${port} 포트로 연결되었습니다.`);
});
