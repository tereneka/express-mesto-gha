const { Joi, celebrate } = require('celebrate');
const { urlReg } = require('../utils/constants');

const cardValidator = celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    link: Joi.string().required().pattern(urlReg),
  }),
});

const cardIdValidator = celebrate({
  params: Joi.object().keys({
    cardId: Joi.string().required().hex().length(24),
  }),
});

module.exports = { cardValidator, cardIdValidator };
