const mongoose = require('mongoose');
const { Error } = mongoose;
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const {
  OK,
  DEFAULT_ERROR,
  errMessages,
  SUCCESS,
  BAD_REQUEST_ERROR,
} = require('../utils/errStatus');
const { sendData } = require('../utils/utils');
const { NODE_ENV, JWT_SECRET } = process.env;

const getUsers = (_, res) => {
  User.find({})
    .then((users) => res.status(OK).send(users))
    .catch(() => {
      res.status(DEFAULT_ERROR).send({ message: errMessages.DEFAULT });
    });
};

const getUser = (req, res) => {
  User.findById(req.params.userId)
    .then((user) => sendData(res, user))
    .catch((err) => {
      // а разве тернарый оератор не прерывает функцию также как if-else?
      if (err instanceof Error.CastError) {
        res
          .status(BAD_REQUEST_ERROR)
          .send({ message: errMessages.BAD_REQUEST });
      } else {
        res.status(DEFAULT_ERROR).send({ message: errMessages.DEFAULT });
      }
    });
};

const createUser = (req, res) => {
  const { name, about, avatar, email, password } = req.body;

  bcrypt.hash(password, 10).then((hash) => {
    User.create({ name, about, avatar, email, password: hash })
      .then((user) => res.status(SUCCESS).send(user))
      .catch((err) => {
        if (err instanceof Error.ValidationError) {
          res
            .status(BAD_REQUEST_ERROR)
            .send({ message: errMessages.BAD_REQUEST });
        } else {
          res.status(DEFAULT_ERROR).send({ message: errMessages.DEFAULT });
        }
      });
  });
};

const login = (req, res) => {
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
        .end();
    })
    .catch((err) => {
      res.status(401).send({ message: err.message });
    });
};

function updateUserData(req, res, body) {
  User.findByIdAndUpdate(req.user._id, body, {
    new: true,
    runValidators: true,
  })
    .then((user) => sendData(res, user))
    .catch((err) => {
      if (err instanceof Error.ValidationError) {
        res
          .status(BAD_REQUEST_ERROR)
          .send({ message: errMessages.BAD_REQUEST });
      } else {
        res.status(DEFAULT_ERROR).send({ message: errMessages.DEFAULT });
      }
    });
}

const editProfile = (req, res) => {
  const body = { name: req.body.name, about: req.body.about };
  updateUserData(req, res, body);
};

const editAvatar = (req, res) => {
  const body = { avatar: req.body.avatar };
  updateUserData(req, res, body);
};

module.exports = {
  getUsers,
  getUser,
  createUser,
  login,
  editProfile,
  editAvatar,
};
