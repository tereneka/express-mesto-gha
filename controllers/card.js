const Card = require("../models/card");
const {
  OK,
  BAD_REQUEST_ERROR,
  NOT_FOUND_ERROR,
  DEFAULT_ERROR,
  errMessages,
} = require("../utils/errStatus");

const userModel = [
  { path: "owner", model: "user" },
  { path: "likes", model: "user" },
];

const getCards = (_, res) => {
  Card.find({})
    .populate(userModel)
    .then((users) => res.status(OK).send(users))
    .catch(() => {
      res.status(DEFAULT_ERROR).send({ message: errMessages.default });
    });
};

const createCard = (req, res) => {
  const { name, link } = req.body;

  Card.create({ name, link, owner: req.user._id })
    .then((card) => res.status(OK).send(card))
    .catch((err) => {
      if (err.name === "ValidationError") {
        return res
          .status(BAD_REQUEST_ERROR)
          .send({ message: errMessages.badRequest });
      }
      return res.status(DEFAULT_ERROR).send({ message: errMessages.default });
    });
};

const deleteCard = (req, res) => {
  Card.findByIdAndRemove(req.params.cardId)
    .then((card) => {
      if (card) {
        res.status(OK).send(card);
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

const likeCard = (req, res) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $addToSet: { likes: req.user._id } },
    { new: true }
  )
    .populate(userModel)
    .then((card) => {
      if (card) {
        res.status(OK).send(card);
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

const dislikeCard = (req, res) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $pull: { likes: req.user._id } },
    { new: true }
  )
    .populate(userModel)
    .then((card) => {
      if (card) {
        res.status(OK).send(card);
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

module.exports = {
  getCards,
  createCard,
  deleteCard,
  likeCard,
  dislikeCard,
};
