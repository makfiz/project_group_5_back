const { HttpError } = require('../helpers/httpError');
const jwt = require('jsonwebtoken');
const { dbUsers } = require('../models/user');

const { SECRET_KEY } = process.env;

const authIdent = async (req, res, next) => {
  // мідлвара перевіряє токен юзера і додає данні юзера до request, якщо токен вірний
  const { authorization = '' } = req.headers; // зоголовок authorization берем із request.headers
  const [bearer, token] = authorization.split(' '); // деструктуризація строки authorization

  if (bearer !== 'Bearer') {
    next(new HttpError(401, 'Not authorized'));
  }

  try {
    const { id } = jwt.verify(token, SECRET_KEY); // забираємо айди (payload) з токену
    const user = await dbUsers.findById(id); // знаходимо юзера за id
    if (!user || !user.token) {
      next(new HttpError(401));
    }
    req.user = user; // додаэмо user в request
    next();
  } catch (error) {
    if (
      error.name === 'TokenExpiredError' ||
      error.name === 'JsonWebTokenError'
    ) {
      next(new HttpError(401, 'jwt token is expired or not valid'));
    }

    next(new HttpError(401, error.message));
  }
};

module.exports = authIdent;
