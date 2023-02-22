const { dbUsers } = require("../../models/user");
const { HttpError } = require("../../helpers/httpError");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const { SECRET_KEY } = process.env;

const loginUser = async (req, res) => {
	const { email, password } = req.body;
	const user = await dbUsers.findOne({ email }); // Перевірка на наявність такого email в базі, агументом до методу create() - повинен бути об'єкт
	if (!user) {
		throw new HttpError(401, 'Email is wrong');
	}

	if (!user.verifyEmail) {
		throw new HttpError(401, 'Email is not verified. Please check your e-mail.');
	}

	const comparePassword = await bcrypt.compare(password, user.password); // Перевірка пароля
	if (!comparePassword) {
		throw new HttpError(401, 'Password is wrong');
	}
	const payload = {
		id: user._id,
	}
	const token = jwt.sign(payload, SECRET_KEY, { expiresIn: "24h" }); // генерування токена
	await dbUsers.findByIdAndUpdate(user._id, { token });
	const id = user._id;
	res.status(200).json({
		token,
		email,
		id,
	});
}

module.exports = loginUser;