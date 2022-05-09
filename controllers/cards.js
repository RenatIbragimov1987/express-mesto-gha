const Card = require('../models/card');

const getCard = async (req, res) => {
  try {
    const cards = await Card.find({}).populate('owner').exec();
    res.status(200).send(cards);
  } catch (err) {
    res
      .status(500)
      .send({ message: `На сервере произошла ошибка: ${err.message}` });
  }
};

const createCard = async (req, res) => {
  try {
    const owner = req.user._id;
    const { name, link } = req.body;
    const card = new Card({ name, link, owner });
    res.status(201).send(await card.save());
  } catch (err) {
    if (err.name === 'ValidationError') {
      res.status(400).send({
        message: `Произошла ошибка. Поля должны быть заполнены: ${err.message}`,
      });
      return;
    }
    res
      .status(500)
      .send({ message: `На сервере произошла ошибка: ${err.message}` });
  }
};

const deleteCard = async (req, res) => {
  try {
    const card = await Card.findByIdAndDelete(req.params.cardId);
    if (!card) {
      res.status(404).send({ message: 'Нет карточки с таким id' });
      return;
    }
    res.status(200).send(card);
  } catch (err) {
    if (err.name === 'CastError') {
      res.status(400).send({ message: 'Некорректный id карточки' });
      return;
    }
    res
      .status(500)
      .send({ message: `На сервере произошла ошибка: ${err.message}` });
  }
};

const likeCard = async (req, res) => {
  try {
    const like = await Card.findByIdAndUpdate(
      req.params.cardId,
      { $addToSet: { likes: req.user._id } }, // добавить _id в массив, если его там нет
      { new: true },
    );
    if (!like) {
      res.status(404).send({ message: 'Нет карточки с таким id' });
      return;
    }
    res.status(200).send(like);
  } catch (err) {
    if (err.name === 'CastError') {
      res.status(400).send({ message: 'Некорректный id карточки' });
      return;
    }
    res
      .status(500)
      .send({ message: `На сервере произошла ошибка: ${err.message}` });
  }
};

const dislikeCard = async (req, res) => {
  try {
    const like = await Card.findByIdAndUpdate(
      req.params.cardId,
      { $pull: { likes: req.user._id } }, // убрать _id из массива
      { new: true },
    );
    if (!like) {
      res.status(404).send({ message: 'Нет карточки с таким id' });
      return;
    }
    res.status(200).send(like);
  } catch (err) {
    if (err.name === 'CastError') {
      res.status(400).send({ message: 'Некорректный id карточки' });
      return;
    }
    res
      .status(500)
      .send({ message: `На сервере произошла ошибка: ${err.message}` });
  }
};

module.exports = {
  getCard,
  createCard,
  deleteCard,
  likeCard,
  dislikeCard,
};
