const User = require("../models/user");
const {
  OK,
  BAD_REQUEST_ERROR,
  NOT_FOUND_ERROR,
  DEFAULT_ERROR,
  errMessages,
} = require("../utils/errStatus");

const getUsers = (_, res) => {
  User.find({})
    .then((users) => res.status(OK).send(users))
    .catch(() => {
      res.status(DEFAULT_ERROR).send({ message: errMessages.default });
    });
};

const getUser = (req, res) => {
  return User.findById(req.params.userId)
    .then((user) => {
      if (user) {
        res.status(OK).send(user);
      } else {
        res.status(NOT_FOUND_ERROR).send({ message: errMessages.notFound });
      }
    })
    .catch((err) => {
      if (err.name === "CastError") {
        return res
          .status(BAD_REQUEST_ERROR)
          .send({ message: errMessages.badRequest });
      }
      return res.status(DEFAULT_ERROR).send({ message: errMessages.default });
    });
};

const createUser = (req, res) => {
  const { name, about, avatar } = req.body;
  User.create(req.body)
    .then((user) => res.status(OK).send(user))
    .catch((err) => {
      if (err.name === "ValidationError") {
        return res
          .status(BAD_REQUEST_ERROR)
          .send({ message: errMessages.badRequest });
      }
      return res.status(DEFAULT_ERROR).send({ message: errMessages.default });
    });
};

const editProfile = (req, res) => {
  const { name, about } = req.body;

  User.findByIdAndUpdate(
    req.user._id,
    { name, about },
    { new: true, runValidators: true }
  )
    .then((user) => {
      if (user) {
        res.status(OK).send(user);
      } else {
        res.status(NOT_FOUND_ERROR).send({ message: errMessages.notFound });
      }
    })
    .catch((err) => {
      if (err.name === "ValidationError") {
        return res
          .status(BAD_REQUEST_ERROR)
          .send({ message: errMessages.badRequest });
      }
      return res.status(DEFAULT_ERROR).send({ message: errMessages.default });
    });
};

const editAvatar = (req, res) => {
  const { name, about } = req.body;

  User.findByIdAndUpdate(req.user._id, { name, about })
    .then((user) => {
      if (user) {
        res.status(OK).send(user);
      } else {
        res.status(NOT_FOUND_ERROR).send({ message: errMessages.notFound });
      }
    })
    .catch((err) => {
      if (err.name === "ValidationError") {
        return res
          .status(BAD_REQUEST_ERROR)
          .send({ message: errMessages.badRequest });
      }
      return res.status(DEFAULT_ERROR).send({ message: errMessages.default });
    });
};

module.exports = {
  getUsers,
  getUser,
  createUser,
  editProfile,
  editAvatar,
};
