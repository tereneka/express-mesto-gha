const mongoose = require('mongoose');
const { Error } = mongoose;
const Card = require('../models/card');
const {
  OK,
  DEFAULT_ERROR,
  errMessages,
  SUCCESS,
  BAD_REQUEST_ERROR,
} = require('../utils/errStatus');
const { sendData } = require('../utils/utils');
const ForbiddenErr = require('../errors/forbiddenErr');

const userModel = [
  { path: 'owner', model: 'user' },
  { path: 'likes', model: 'user' },
];

const getCards = (_, res, next) => {
  Card.find({})
    .populate(userModel)
    .then((users) => res.status(OK).send(users))
    .catch(next);
};

const createCard = (req, res, next) => {
  const { name, link } = req.body;

  Card.create({ name, link, owner: req.user._id })
    .then((card) => res.status(SUCCESS).send(card))
    .catch(next);
};

const deleteCard = (req, res, next) => {
  Card.findByIdAndRemove(req.params.cardId)
    .then((card) => {
      if (card.owner._id !== req.user._id) {
        throw new ForbiddenErr(errMessages.FORBIDDEN);
      }
      sendData(res, card);
    })
    .catch(next);
};

function setCardLike(req, res, option, next) {
  Card.findByIdAndUpdate(req.params.cardId, option, { new: true })
    .populate(userModel)
    .then((card) => sendData(res, card))
    .catch(next);
}

const likeCard = (req, res, next) => {
  const option = { $addToSet: { likes: req.user._id } };
  setCardLike(req, res, option, next);
};

const dislikeCard = (req, res, next) => {
  const option = { $pull: { likes: req.user._id } };
  setCardLike(req, res, option, next);
};

module.exports = {
  getCards,
  createCard,
  deleteCard,
  likeCard,
  dislikeCard,
};
