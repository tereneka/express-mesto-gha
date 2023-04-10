const Card = require("../models/card");
const BadRequestError = require("../errors/badRequestError");
const NotFoundError = require("../errors/notFoundError");
const DefaultError = require("../errors/defaultError");
const { sendResult, sendError } = require("../utils/utils");

const userModel = [
  { path: "owner", model: "user" },
  { path: "likes", model: "user" },
];

module.exports.getCards = (_, res) => {
  Card.find({})
    .populate(userModel)
    .then((cards) => res.status(200).res.send(cards))
    .catch(() =>
      res.status(500).res.send({ message: "Что-то пошло не так..." })
    );
};

module.exports.createCard = (req, res) => {
  const { name, link } = req.body;

  Card.create({ name, link, owner: req.user._id })
    .then((card) => sendResult(card, res, new BadRequestError()))
    .catch((err) => {
      if (err instanceof BadRequestError) {
        sendError(res, err);
        return;
      }
      res.status(500).res.send({ message: "Что-то пошло не так..." });
    });
};

module.exports.deleteCard = (req, res) => {
  Card.findByIdAndRemove(req.params.cardId)
    .then((card) => sendResult(card, res, new NotFoundError()))
    .catch(() => {
      if (err instanceof NotFoundError) {
        sendError(res, err);
        return;
      }
      res.status(500).res.send({ message: "Что-то пошло не так..." });
    });
};

module.exports.likeCard = (req, res) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $addToSet: { likes: req.user._id } },
    { new: true }
  )
    .populate(userModel)
    .then((card) => sendResult(card, res, new NotFoundError()))
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

module.exports.dislikeCard = (req, res) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $pull: { likes: req.user._id } },
    { new: true }
  )
    .populate(userModel)
    .then((card) => sendResult(card, res, new NotFoundError()))
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
