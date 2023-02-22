const Joi = require("joi");

// const emailRegExp = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
const emailRegExp =
  /^[a-z0-9!#$%&'+/=?^_`{|}~-]+(?:.[a-z0-9!#$%&'+/=?^_`{|}~-]+)@(?:[a-z0-9](?:[a-z0-9-][a-z0-9])?.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;

const registerSchema = Joi.object({
  // бібліотека для перевірки - схема для перевірки (як propTypes)
  name: Joi.string().min(2).required(),
  password: Joi.string().min(6).required(),
  email: Joi.string().pattern(emailRegExp).required(),
  city: Joi.string().min(2).required(),
  phone: Joi.string().min(2).required(),
  token: Joi.string(),
});

const loginSchema = Joi.object({
  // бібліотека для перевірки - схема для перевірки (як propTypes)
  password: Joi.string().min(6).required(),
  email: Joi.string().pattern(emailRegExp).required(),
});

const userUpdateSchema = Joi.object({
  name: Joi.string(),
  email: Joi.string().pattern(emailRegExp),
  birthday: Joi.string(),
  phone: Joi.string(),
  city: Joi.string(),
});

const updatePasswordSchema = Joi.object({
  password: Joi.string().required(),
  newPassword: Joi.string().required(),
});

const restorePasswordSchema = Joi.object({
  email: Joi.string().email().required(),
});

const joiSchemaUser = {
  register: registerSchema,
  login: loginSchema,
  update: userUpdateSchema,
  restore: restorePasswordSchema,
  updatePass: updatePasswordSchema,
};

module.exports = {
  joiSchemaUser,
};
