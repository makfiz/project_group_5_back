const { dbUsers } = require("../../models/user");
const jwt = require("jsonwebtoken");

const { SECRET_KEY, FRONTEND_URL } = process.env;

const googleAuthUser = async (req, res) => {
    const { _id: id } = req.user;
    const payload = {
		id,
	}
	const token = jwt.sign(payload, SECRET_KEY, { expiresIn: "24h" }); // генерування токена
    await dbUsers.findByIdAndUpdate(user._id, { token });
    
    res.redirect(`${FRONTEND_URL}/api/users/login?token=${token}`);
}

module.exports = googleAuthUser;

//Второй вариант, без этой ф-ции и эндпоинта, а на фронте сразу после запроса на ".../google", делать запрос на логин