const mongoose = require('mongoose');
const { Schema } = mongoose;
const validator = require('validator');
const bcrypt = require('bcryptjs');
const AuthorizationErr = require('../errors/authorizationErr');
const { errMessages } = require('../utils/errStatus');

const userSchema = new Schema({
  name: {
    type: String,
    minlength: 2,
    maxlength: 30,
    default: 'Жак-Ив Кусто',
  },
  about: {
    type: String,
    minlength: 2,
    maxlength: 30,
    default: 'Исследователь',
  },
  avatar: {
    type: String,
    default:
      'https://pictures.s3.yandex.net/resources/jacques-cousteau_1604399756.png',
    validate: {
      validator: function (v) {
        return validator.isURL(v, {
          protocols: ['http', 'https'],
          require_protocol: true,
        });
      },
      message: (props) => `${props.value} - некорректный url!`,
    },
  },
  email: {
    type: String,
    required: true,
    unique: true,
    validate: {
      validator: function (v) {
        return validator.isEmail(v);
      },
      message: (props) => `${props.value} - некорректный email!`,
    },
  },
  password: {
    type: String,
    required: true,
    minlength: 8,
    select: false, // запрет на отправку пароля при get запросах
  },
});

userSchema.statics.findUserByCredentials = function (email, password) {
  return this.findOne({ email })
    .select('+password') // получение пароля
    .then((user) => {
      if (!user) {
        throw new AuthorizationErr(errMessages.AUTH);
      }

      return bcrypt.compare(password, user.password).then((matched) => {
        if (!matched) {
          throw new AuthorizationErr(errMessages.AUTH);
        }

        return user;
      });
    });
};

module.exports = mongoose.model('user', userSchema);
