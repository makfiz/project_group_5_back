const { dbUsers } = require("../../models/user");
const { HttpError } = require("../../helpers/httpError");
const { sendConfirmMail } = require("../../helpers/sendVerifyMail");

async function verifyMail(req, res, next) {
	const { verificationToken } = req.params;

	const user = await dbUsers.findOne({
		verificationToken: verificationToken,
	});

	if (!user) {
		throw new HttpError(404, error.message);
	};

	await dbUsers.findByIdAndUpdate(user._id, {
		verifyEmail: true,
		verificationToken: "",
	});
	const { email, name } = user;
	await sendConfirmMail(email, name);
	// res.redirect(`${FRONTEND_URL}/api/users/login?token=${token}&email=${email}&id=${id}`);
	return;
}

module.exports = verifyMail;