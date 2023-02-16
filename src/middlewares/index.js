const { BadRequest } = require("http-errors");

function validateBody(schema) {
  return (req, res, next) => {
    const { error } = schema.validate(req.body);
    if (error) {
      return next(BadRequest(error.message));
    }

    return next();
  };
}

const validateParams = (schema) => {
  return (req, res, next) => {
    const { error } = schema.validate(req.params);
    if (error) {
      return next(BadRequest(error.message));
    }

    return next();
  };
};

module.exports = validateBody;

module.exports = {
  validateBody,
  validateParams,
};
