const { Joi, celebrate } = require('celebrate');

const urlReg =
  /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_+.~#?&//=]*)/;

const registerValidator = celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required(),
    name: Joi.string().min(2).max(30),
    about: Joi.string().min(2).max(30),
    avatar: Joi.string().pattern(urlReg),
  }),
});

const loginValidator = celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required(),
  }),
});

const userIdValidator = celebrate({
  params: Joi.object().keys({
    id: Joi.string().required().hex().length(24),
  }),
});

const userProfileValidator = celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30),
    about: Joi.string().min(2).max(30),
  }),
});

const userAvatarValidator = celebrate({
  body: Joi.object().keys({
    avatar: Joi.string().pattern(urlReg),
  }),
});

module.exports = {
  registerValidator,
  loginValidator,
  userIdValidator,
  userProfileValidator,
  userAvatarValidator,
};
