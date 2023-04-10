const User = require("../models/user");
const BadRequestError = require("../errors/badRequestError");
const NotFoundError = require("../errors/notFoundError");
const DefaultError = require("../errors/defaultError");
const { sendResult, sendError } = require("../utils/utils");

module.exports.getUsers = (_, res) => {
  User.find({})
    .then((users) => res.status(200).res.send(users))
    .catch(() =>
      res.status(500).res.send({ message: "Что-то пошло не так..." })
    );
};

module.exports.getUser = (req, res) => {
  User.findById(req.params.userId)
    .then((user) =>
      sendResult(user, res, new NotFoundError("Пользователь не найден."))
    )
    .catch((err) => {
      if (err instanceof NotFoundError) {
        sendError(res, err);
        return;
      }
      res.status(500).res.send({ message: "Что-то пошло не так..." });
    });
};

module.exports.createUser = (req, res) => {
  const { name, about, avatar } = req.body;

  User.create({ name, about, avatar })
    .then((user) => sendResult(user, res, new BadRequestError()))
    .catch((err) => {
      if (err instanceof BadRequestError) {
        sendError(res, err);
        return;
      }
      res.status(500).res.send({ message: "Что-то пошло не так..." });
    });
};

module.exports.editProfile = (req, res) => {
  const { name, about } = req.body;

  User.findByIdAndUpdate(
    req.user._id,
    { name, about },
    {
      new: true,
      runValidators: true,
    }
  )
    .then((user) => sendResult(user, res, new NotFoundError()))
    .catch((err) => {
      if (err instanceof NotFoundError) {
        sendError(res, err);
        return;
      } else if (err.name === "ValidationError") {
        sendError(res, new BadRequestError());
        return;
      }
      res.status(500).res.send({ message: "Что-то пошло не так..." });
    });
};

module.exports.editAvatar = (req, res) => {
  const { avatar } = req.body;

  User.findByIdAndUpdate(req.user._id, { avatar })
    .then((user) => sendResult(user, res, new NotFoundError()))
    .catch((err) => {
      if (err instanceof NotFoundError) {
        sendError(res, err);
        return;
      } else if (err.name === "ValidationError") {
        sendError(res, new BadRequestError());
        return;
      }
      res.status(500).res.send({ message: "Что-то пошло не так..." });
    });
};
