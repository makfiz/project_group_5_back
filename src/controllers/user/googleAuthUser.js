const { dbUsers } = require('../../models/user');
const jwt = require('jsonwebtoken');

const { SECRET_KEY, FRONTEND_URL } = process.env;

const googleAuthUser = async (req, res) => {
  const { _id: id, email } = req.user;
  const payload = {
    id,
  };
  const token = jwt.sign(payload, SECRET_KEY, { expiresIn: '24h' }); // генерування токена
  await dbUsers.findByIdAndUpdate(id, { token });

  res.redirect(`${FRONTEND_URL}?token=${token}&email=${email}&id=${id}`);
};

module.exports = googleAuthUser;
