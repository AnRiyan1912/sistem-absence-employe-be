import { emailConfig } from "../config/nodemailerConfig";
import { HTML_SEND_VERIFICATION_CODE } from "../constant/constant";
const nodemailer = require("nodemailer");

export const sendMailMessageVerification = (to: string, verificationCode: number) => {
  const transporter = nodemailer.createTransport(emailConfig);
  const htmlContent = HTML_SEND_VERIFICATION_CODE.replace(
    "verification_code",
    verificationCode.toString()
  );
  const mailOptions = {
    from: "truecuks19@gmail.com",
    to: to,
    subject: "Verification code reset password",
    html: htmlContent,
  };

  transporter.sendMail(mailOptions);
};
