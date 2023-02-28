const Joi = require('joi');

const emailRegExp =
  /^((?!-)([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
const passRegExp = /^[^\s]{7,32}$/;
const cityRegExp =
  /^[a-zA-Zа-яА-ЯіІїЇґҐ']+(?:[\s-][a-zA-Zа-яА-ЯіІїЇґҐ']+)*,\s*[a-zA-Zа-яА-ЯіІїЇґҐ']+(?:[\s-][a-zA-Zа-яА-ЯіІїЇґҐ']+)*$/;
const phoneRegExp = /^\+3\d{11}$/;
const birthdayRegExp = /^(0?[1-9]|[1-2][0-9]|3[0-1])\.(0?[1-9]|1[0-2])\.\d{4}$/;

const registerSchema = Joi.object({
  name: Joi.string().required(),
  password: Joi.string().required(),
  email: Joi.string().pattern(emailRegExp).required(),
  city: Joi.string().pattern(cityRegExp).required(),
  phone: Joi.string().pattern(phoneRegExp).required(),
  token: Joi.string(),
});

const loginSchema = Joi.object({
  password: Joi.string().required(),
  email: Joi.string().pattern(emailRegExp).required(),
});

const userUpdateSchema = Joi.object({
  name: Joi.string(),
  email: Joi.string().pattern(emailRegExp),
  birthday: Joi.string().pattern(birthdayRegExp),
  phone: Joi.string().pattern(phoneRegExp),
  city: Joi.string().pattern(cityRegExp),
});

const updatePasswordSchema = Joi.object({
  password: Joi.string().required(),
  newPassword: Joi.string().pattern(passRegExp).required(),
});

const restorePasswordSchema = Joi.object({
  email: Joi.string().pattern(emailRegExp).email().required(),
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
