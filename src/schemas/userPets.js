const Joi = require('joi');
const dateBirthRegExp = /^(0[1-9]|[1-2][0-9]|3[0-1])\.(0[1-9]|1[0-2])\.[0-9]{4}$/;
 
const createPetSchema = Joi.object({
  name: Joi.string()
    .pattern(/^[A-Za-zА-Яа-яІіЇїЄє'-.]+$/)
    .min(2)
    .max(16),
  dateOfBirth: Joi.string().pattern(dateBirthRegExp),
  breed: Joi.string()
    .pattern((/^[A-Za-zА-Яа-яІіЇїЄє'-.]+$/))
    .min(2)
    .max(16),
  comments: Joi.string().min(8).max(120),
  petImage: null,
});

module.exports = {
  createPetSchema,
};
