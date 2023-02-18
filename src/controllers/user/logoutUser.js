const { dbUsers } = require("../../models/user");

const logoutUser = async (req, res, next) => {
	const { id } = req.user;
	await dbUsers.findByIdAndUpdate(id, { token: "" });
	res.status(204).end();
}

module.exports = logoutUser;