const { dbUsers } = require("../../models/user");
const { HttpError } = require("../../helpers/httpError");

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

	// res.redirect(`${FRONTEND_URL}/api/users/login?token=${token}&email=${email}&id=${id}`);
	return res.status(200).json({
		message: "Verification successful",
	});
}

module.exports = verifyMail;