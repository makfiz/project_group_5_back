const nodemailer = require("nodemailer");
// require("dotenv").config();

const { FROM_EMAIL, MAILTRAP_PASS, MAILTRAP_USER, PETLY_EMAIL, PETLY_PASSWORD, BASE_URL } = process.env;

const sendVerifyMail = async (toEmail, verificationId) => {
	try {
	//Для тестов
		const email = {
			from: FROM_EMAIL,
			to: toEmail,
			subject: "E-mail verification",
			html: `<a href="localhost:3000/api/users/verify/${verificationId}">Please confirm your e-mail</a>`,
		}

		const transport = nodemailer.createTransport({
			host: "sandbox.smtp.mailtrap.io",
			port: 2525,
			auth: {
				user: MAILTRAP_USER,
				pass: MAILTRAP_PASS
			}
		});

	// Для продакшена
		// const email = {
		// 	from: PETLY_EMAIL,
		// 	to: toEmail,
		// 	subject: "E-mail verification",
		// 	html: `<a href="${BASE_URL}/api/users/verify/${verificationId}">Please confirm your e-mail</a>`,
		// }

		// const transport = nodemailer.createTransport({
		// 	host: 'smtp.meta.ua',
		// 	port: 465,
		// 	secure: true,
		// 	auth: {
		// 		user: PETLY_EMAIL,
		// 		pass: PETLY_PASSWORD,
		// 	}
		// });

		await transport.sendMail(email);
	} catch (error) {
		console.error("app error:", error);
	}
};

module.exports = sendVerifyMail;