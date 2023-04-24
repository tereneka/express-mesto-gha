const cardRouter = require('express').Router();
const {
  getCards,
  createCard,
  deleteCard,
  likeCard,
  dislikeCard,
} = require('../controllers/card');
const {
  cardIdValidator,
  cardValidator,
} = require('../validators/cardValidator');

cardRouter.get('/', getCards);

cardRouter.post('/', cardValidator, createCard);

cardRouter.delete('/:cardId', cardIdValidator, deleteCard);

cardRouter.put('/:cardId/likes', cardIdValidator, likeCard);

cardRouter.delete('/:cardId/likes', cardIdValidator, dislikeCard);

module.exports = cardRouter;
