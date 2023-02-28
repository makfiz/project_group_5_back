const Joi = require('joi');

const createNoticeSchema = Joi.object({
  category: Joi.string()
    .valid('sell', 'lost_found', 'in_good_hands')
    .required(),
  title: Joi.string().min(2).max(48).required(),
  name: Joi.string().optional().min(2).max(16).allow('').default('unknown'),
  birth: Joi.string().optional().allow('').default('unknown'),
  breed: Joi.string().optional().min(2).max(48).allow('').default('unknown'),
  sex: Joi.string().valid('male', 'female').required(),
  location: Joi.string().required(),
  price: Joi.string(),
  photoURL: Joi.string(),
  comments: Joi.string().min(8).max(120),
  favoritesIn: Joi.array().items(Joi.string),
  owner: Joi.string(),
});

module.exports = { createNoticeSchema };
