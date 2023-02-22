const nodemailer = require("nodemailer");

// require("dotenv").config();

const { FROM_EMAIL, MAILTRAP_PASS, MAILTRAP_USER } = process.env;

const sendVerifyMail = async (toEmail, verificationId) => {
  try {
    const email = {
      from: FROM_EMAIL,
      to: toEmail,
      subject: "E-mail verification",
      html: `<a href="localhost:3000/api/users/verify/${verificationId}">Please confirm your e-mail</a>`,
    };

    const transport = nodemailer.createTransport({
      host: "sandbox.smtp.mailtrap.io",
      port: 2525,
      auth: {
        user: MAILTRAP_USER,
        pass: MAILTRAP_PASS,
      },
    });

    await transport.sendMail(email);
  } catch (error) {
    console.error("app error:", error);
  }
};

const sendChangePassword = async (toEmail, newPassword) => {
  try {
    const email = {
      from: FROM_EMAIL,
      to: toEmail,
      subject: "Restore access",
      html: `<p>Your new password for petly: ${newPassword}</p> <p>You can change it in your account</p>`,
    };

    const transport = nodemailer.createTransport({
      host: "sandbox.smtp.mailtrap.io",
      port: 2525,
      auth: {
        user: MAILTRAP_USER,
        pass: MAILTRAP_PASS,
      },
    });

    await transport.sendMail(email);
  } catch (error) {
    console.error("app error:", error);
  }
};

module.exports = { sendVerifyMail, sendChangePassword };
