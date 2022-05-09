const express = require('express');

const cards = express.Router();
const {
  getCard,
  createCard,
  deleteCard,
  likeCard,
  dislikeCard,
} = require('../controllers/cards');

cards.get('/cards', getCard);
cards.post('/cards', express.json(), createCard);
cards.delete('/cards/:cardId', deleteCard);
cards.put('/cards/:cardId/likes', likeCard);
cards.delete('/cards/:cardId/likes', dislikeCard);

module.exports = {
  cards,
};
