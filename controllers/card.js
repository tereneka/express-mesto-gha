const Card = require("../models/card");
const BadRequestError = require("../errors/badRequestError");
const NotFoundError = require("../errors/notFoundError");
const DefaultError = require("../errors/defaultError");
const { sendResult, sendError } = require("../utils/utils");

module.exports.getCards = (_, res) => {
  Card.find({})
    .populate([
      { path: "owner", model: "user" },
      { path: "likes", model: "user" },
    ])
    .then((cards) => res.send(cards))
    .catch(() => sendError(res, new DefaultError()));
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
      sendError(res, new DefaultError());
    });
};

module.exports.deleteCard = (req, res) => {
  Card.findByIdAndRemove(req.params.cardId)
    .then((card) => res.send(card))
    .catch(() => sendError(res, new DefaultError()));
};

module.exports.likeCard = (req, res) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $addToSet: { likes: req.user._id } },
    { new: true }
  )
    .then((card) => sendResult(card, res, new BadRequestError()))
    .catch((err) => {
      if (err instanceof BadRequestError) {
        sendError(res, err);
        return;
      }
      sendError(res, new DefaultError());
    });
};

module.exports.dislikeCard = (req, res) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $pull: { likes: req.user._id } },
    { new: true }
  )
    .then((card) => sendResult(card, res, new BadRequestError()))
    .catch((err) => {
      if (err instanceof BadRequestError) {
        sendError(res, err);
        return;
      }
      sendError(res, new DefaultError());
    });
};
