const mongoose = require('mongoose');
const { Error } = mongoose;
const Card = require('../models/card');
const {
  OK,
  DEFAULT_ERROR,
  errMessages,
  SUCCESS,
} = require('../utils/errStatus');
const { sendData } = require('../utils/utils');

const userModel = [
  { path: 'owner', model: 'user' },
  { path: 'likes', model: 'user' },
];

const getCards = (_, res) => {
  Card.find({})
    .populate(userModel)
    .then((users) => res.status(OK).send(users))
    .catch(() =>
      res.status(DEFAULT_ERROR).send({ message: errMessages.DEFAULT }),
    );
};

const createCard = (req, res) => {
  const { name, link } = req.body;

  Card.create({ name, link, owner: req.user._id })
    .then((card) => res.status(SUCCESS).send(card))
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

const deleteCard = (req, res) => {
  Card.findByIdAndRemove(req.params.cardId)
    .then((card) => sendData(res, card))
    .catch((err) => {
      if (err instanceof Error.CastError) {
        res
          .status(BAD_REQUEST_ERROR)
          .send({ message: errMessages.BAD_REQUEST });
      } else {
        res.status(DEFAULT_ERROR).send({ message: errMessages.DEFAULT });
      }
    });
};

function setCardLike(req, res, option) {
  Card.findByIdAndUpdate(req.params.cardId, option, { new: true })
    .populate(userModel)
    .then((card) => sendData(res, card))
    .catch((err) => {
      if (err instanceof Error.CastError) {
        res
          .status(BAD_REQUEST_ERROR)
          .send({ message: errMessages.BAD_REQUEST });
      } else {
        res.status(DEFAULT_ERROR).send({ message: errMessages.DEFAULT });
      }
    });
}

const likeCard = (req, res) => {
  const option = { $addToSet: { likes: req.user._id } };
  setCardLike(req, res, option);
};

const dislikeCard = (req, res) => {
  const option = { $pull: { likes: req.user._id } };
  setCardLike(req, res, option);
};

module.exports = {
  getCards,
  createCard,
  deleteCard,
  likeCard,
  dislikeCard,
};
