const User = require("../models/user");
const { OK, DEFAULT_ERROR, errMessages } = require("../utils/errStatus");
const { sendData, sendError } = require("../utils/utils");

const getUsers = (_, res) => {
  User.find({})
    .then((users) => res.status(OK).send(users))
    .catch(() =>
      res.status(DEFAULT_ERROR).send({ message: errMessages.default })
    );
};

const getUser = (req, res) => {
  User.findById(req.params.userId)
    .then((user) => sendData(res, user))
    .catch((err) => sendError(res, err, "CastError"));
};

const createUser = (req, res) => {
  const { name, about, avatar } = req.body;

  User.create({ name, about, avatar })
    .then((user) => res.status(OK).send(user))
    .catch((err) => sendError(res, err, "ValidationError"));
};

const editProfile = (req, res) => {
  const { name, about } = req.body;

  User.findByIdAndUpdate(
    req.user._id,
    { name, about },
    { new: true, runValidators: true }
  )
    .then((user) => sendData(res, user))
    .catch((err) => sendError(res, err, "ValidationError"));
};

const editAvatar = (req, res) => {
  const { avatar } = req.body;

  User.findByIdAndUpdate(
    req.user._id,
    { avatar },
    { new: true, runValidators: true }
  )
    .then((user) => sendData(res, user))
    .catch((err) => sendError(res, err, "ValidationError"));
};

module.exports = {
  getUsers,
  getUser,
  createUser,
  editProfile,
  editAvatar,
};
