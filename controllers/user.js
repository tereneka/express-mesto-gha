const mongoose = require('mongoose');
const { Error } = mongoose;
const User = require('../models/user');
const {
  OK,
  DEFAULT_ERROR,
  errMessages,
  SUCCESS,
} = require('../utils/errStatus');
const { sendData } = require('../utils/utils');

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
  const { name, about, avatar } = req.body;

  User.create({ name, about, avatar })
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
};

function updateUserInfo(req, res, body) {
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
  updateUserInfo(req, res, body);
};

const editAvatar = (req, res) => {
  const body = { avatar: req.body.avatar };
  updateUserInfo(req, res, body);
};

module.exports = {
  getUsers,
  getUser,
  createUser,
  editProfile,
  editAvatar,
};
