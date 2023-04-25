const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const { OK, SUCCESS } = require('../utils/errStatus');
const { sendData } = require('../utils/utils');

const { NODE_ENV, JWT_SECRET } = process.env;

const getUsers = (_, res, next) => {
  User.find({})
    .then((users) => res.status(OK).send(users))
    .catch(next);
};

const getUser = (req, res, next) => {
  User.findById(req.params.id)
    .then((user) => sendData(res, user))
    .catch(next);
};

const getCurrentUser = (req, res, next) => {
  User.findById(req.user._id)
    .then((user) => sendData(res, user))
    .catch(next);
};

const createUser = (req, res, next) => {
  const {
    name, about, avatar, email, password,
  } = req.body;
  bcrypt.hash(password, 10).then((hash) => {
    User.create({
      name,
      about,
      avatar,
      email,
      password: hash,
    })
      .then((user) => res.status(SUCCESS).send(user))
      .catch(next);
  });
};

const login = (req, res, next) => {
  const { email, password } = req.body;

  User.findUserByCredentials(email, password)
    .then((user) => {
      const token = jwt.sign(
        { _id: user._id },
        NODE_ENV === 'production' ? JWT_SECRET : 'dev-secret',
        {
          expiresIn: '7d',
        },
      );

      res
        .cookie('jwt', token, {
          maxAge: 3600000 * 24 * 7,
          httpOnly: true,
          sameSite: true,
        })
        .send({ email });
    })
    .catch(next);
};

const logout = (req, res) => {
  res.clearCookie('jwt').send({ message: 'Выход' });
};

function updateUserData(req, res, body, next) {
  User.findByIdAndUpdate(req.user._id, body, {
    new: true,
    runValidators: true,
  })
    .then((user) => sendData(res, user))
    .catch(next);
}

const editProfile = (req, res, next) => {
  const body = { name: req.body.name, about: req.body.about };
  updateUserData(req, res, body, next);
};

const editAvatar = (req, res, next) => {
  const body = { avatar: req.body.avatar };
  updateUserData(req, res, body, next);
};

module.exports = {
  getUsers,
  getUser,
  getCurrentUser,
  createUser,
  login,
  logout,
  editProfile,
  editAvatar,
};
