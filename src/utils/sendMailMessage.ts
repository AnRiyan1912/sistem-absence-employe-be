import { emailConfig } from "../config/nodemailerConfig";
import { HTML_SEND_VERIFICATION_CODE } from "../constant/constant";
const nodemailer = require("nodemailer");

export const sendMailMessageVerification = (
  to: string,
  verificationCode: any
) => {
  const transporter = nodemailer.createTransport(emailConfig);
  let htmlContent = HTML_SEND_VERIFICATION_CODE;
  htmlContent.replace("verification_code", verificationCode);
  const mailOptions = {
    from: "truecuks19@gmail.com",
    to: to,
    subject: "Verification code",
    html: htmlContent,
  };

  transporter.sendMail(mailOptions);
};
