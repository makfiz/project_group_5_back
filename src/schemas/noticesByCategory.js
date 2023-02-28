const Joi = require("joi");

const schemaNoticesByCategory = Joi.object({
  category: Joi.string()
    .valid("sell", "lost_found", "in_good_hands")
    .required()
    .messages({
      "any.valid": "This category is not valid",
      "any.required": "Category is required",
    }),
});

module.exports = { schemaNoticesByCategory };
