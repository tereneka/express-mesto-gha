const Card = require("../models/card");
const { OK, DEFAULT_ERROR, errMessages } = require("../utils/errStatus");
const { sendData, sendError } = require("../utils/utils");

const userModel = [
  { path: "owner", model: "user" },
  { path: "likes", model: "user" },
];

const getCards = (_, res) => {
  Card.find({})
    .populate(userModel)
    .then((users) => res.status(OK).send(users))
    .catch(() =>
      res.status(DEFAULT_ERROR).send({ message: errMessages.default })
    );
};

const createCard = (req, res) => {
  const { name, link } = req.body;

  Card.create({ name, link, owner: req.user._id })
    .then((card) => res.status(OK).send(card))
    .catch((err) => sendError(res, err, "ValidationError"));
};

const deleteCard = (req, res) => {
  Card.findByIdAndRemove(req.params.cardId)
    .then((card) => sendData(res, card))
    .catch((err) => sendError(res, err, "CastError"));
};

const likeCard = (req, res) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $addToSet: { likes: req.user._id } },
    { new: true }
  )
    .populate(userModel)
    .then((card) => sendData(res, card))
    .catch((err) => sendError(res, err, "CastError"));
};

const dislikeCard = (req, res) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $pull: { likes: req.user._id } },
    { new: true }
  )
    .populate(userModel)
    .then((card) => sendData(res, card))
    .catch((err) => sendError(res, err, "CastError"));
};

module.exports = {
  getCards,
  createCard,
  deleteCard,
  likeCard,
  dislikeCard,
};
