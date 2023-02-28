const nodemailer = require("nodemailer");
// require("dotenv").config();

const { FROM_EMAIL, MAILTRAP_PASS, MAILTRAP_USER, FRONTEND_URL, PETLY_EMAIL, PETLY_PASSWORD, BASE_URL } = process.env;

          //  Для разработки b тестов
// const sendVerifyMail = async (toEmail, verificationId) => {
//   try {
//     const email = {
//       from: FROM_EMAIL,
//       to: toEmail,
//       subject: "E-mail verification",
//       html: `<a href="http://localhost:3000/api/users/verify/${verificationId}">Please confirm your e-mail</a>`,
//     };

//     const transport = nodemailer.createTransport({
//       host: "sandbox.smtp.mailtrap.io",
//       port: 2525,
//       auth: {
//         user: "d3b184fe6a905a",
//         pass: "2988ab24cb64ff"
//       }
// });

//     await transport.sendMail(email);
//   } catch (error) {
//     console.error("app error:", error);
//   }
// };

  // module.exports = { sendVerifyMail };
  
  
          //Для прода
const sendVerifyMail = async (toEmail, verificationId, name) => {
  try {
    const email = {
      from: PETLY_EMAIL,
      to: toEmail,
      subject: "E-mail verification",
      html: `<h1>Hello ${name}!</h1> <a href="${BASE_URL}/api/users/verify/${verificationId}">Please confirm your e-mail</a>`,
      // html: `<h1>Hello ${name}!</h1> <a href="http://localhost:3000/api/users/verify/${verificationId}">Please confirm your e-mail</a>`,
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
      html: `<h1>Hello ${name}! This is the password and login to your account in ${FRONTEND_URL}</h1> <p>password - ${password}</p> <p>login - ${toEmail}</p>`,
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

module.exports = { sendVerifyMail, sendPasswordMail };

