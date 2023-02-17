const { BadRequest } = require("http-errors");

const validateParams = (schema) => {
  return (req, res, next) => {
    const { error } = schema.validate(req.params);
    if (error) {
      return next(BadRequest(error.message));
    }

    return next();
  };
};

module.exports = validateParams;
