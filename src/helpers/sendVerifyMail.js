const nodemailer = require("nodemailer");

// require("dotenv").config();

const { FROM_EMAIL, MAILTRAP_PASS, MAILTRAP_USER, PETLY_EMAIL, PETLY_PASSWORD, BASE_URL } = process.env;

          //  Для разработки b тестов
// const sendVerifyMail = async (toEmail, verificationId) => {
//   try {
//     const email = {
//       from: FROM_EMAIL,
//       to: toEmail,
//       subject: "E-mail verification",
//       html: `<a href="localhost:3000/api/users/verify/${verificationId}">Please confirm your e-mail</a>`,
//     };

//     const transport = nodemailer.createTransport({
//       host: "sandbox.smtp.mailtrap.io",
//       port: 2525,
//       auth: {
//         user: MAILTRAP_USER,
//         pass: MAILTRAP_PASS,
//       },
//     });

//     await transport.sendMail(email);
//   } catch (error) {
//     console.error("app error:", error);
//   }
// };

// const sendChangePassword = async (toEmail, newPassword) => {
//   try {
//     const email = {
//       from: FROM_EMAIL,
//       to: toEmail,
//       subject: "Restore access",
//       html: `<p>Your new password for petly: ${newPassword}</p> <p>You can change it in your account</p>`,
//     };

//     const transport = nodemailer.createTransport({
//       host: "sandbox.smtp.mailtrap.io",
//       port: 2525,
//       auth: {
//         user: MAILTRAP_USER,
//         pass: MAILTRAP_PASS,
//       },
//     });

//     await transport.sendMail(email);
//   } catch (error) {
//     console.error("app error:", error);
//   }
  
  
          //Для прода
const sendVerifyMail = async (toEmail, verificationId, name) => {
  try {
    const email = {
      from: PETLY_EMAIL,
      to: toEmail,
      subject: "E-mail verification",
      html: `<h1>Hello ${name}!</h1> <a href="${BASE_URL}/api/users/verify/${verificationId}" target="_blank">Please confirm your e-mail</a>`,
    };

    const transport = nodemailer.createTransport({
      host: 'smtp.meta.ua',
      port: 465,
      secure: true,
      auth: {
        user: PETLY_EMAIL,
        pass: PETLY_PASSWORD,
      },
    });

    await transport.sendMail(email);
  } catch (error) {
    console.error("app error:", error);
  }
};

const sendPasswordMail = async (toEmail, password, name) => {
  try {
    const email = {
      from: PETLY_EMAIL,
      to: toEmail,
      subject: "Password verification",
      html: `<h1>Hello ${name}! This is your password and login for the account in https://petssuport4815162342api.onrender.com</h1> <p>password - ${password}</p> <p>login - ${toEmail}</p>`,
    };

    const transport = nodemailer.createTransport({
      host: 'smtp.meta.ua',
      port: 465,
      secure: true,
      auth: {
        user: PETLY_EMAIL,
        pass: PETLY_PASSWORD,
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
      from: PETLY_EMAIL,
      to: toEmail,
      subject: "Restore access",
      html: `<p>Your new password for petly: ${newPassword}</p> <p>You can change it in your account</p>`,
    };

    const transport = nodemailer.createTransport({
      host: 'smtp.meta.ua',
      port: 465,
      secure: true,
      auth: {
        user: PETLY_EMAIL,
        pass: PETLY_PASSWORD,
      },
    });

    await transport.sendMail(email);
  } catch (error) {
    console.error("app error:", error);
  }
};

module.exports = { sendVerifyMail, sendChangePassword, sendPasswordMail };
