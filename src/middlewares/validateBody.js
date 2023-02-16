const { BadRequest } = require('http-errors');

function validateBody(schema) {
  return (req, res, next) => {
    const { error } = schema.validate(req.body);
    if (error) {
      return next(BadRequest(error.message));
    }

    return next();
  };
}

module.exports = validateBody;