const express = require('express');
const mongoose = require('mongoose');

const { PORT = 3000 } = process.env;
const { users } = require('./routes/users');
const { cards } = require('./routes/cards');

const app = express();

app.use((req, res, next) => {
  req.user = {
    _id: '627835b5ee424cc54107062c',
  };
  next();
});

app.get('/', (req, res) => {
  res.send(req.body);
});

app.use('/', users);
app.use('/', cards);

app.use((req, res) => {
  res.status(404).send({ message: 'Запрошен несуществующий маршрут' });
});

async function connectServer() {
  await mongoose.connect('mongodb://localhost:27017/mestodb', {
    useNewUrlParser: true,
    useUnifiedTopology: false,
  });
  app.listen(PORT, () => {
    console.log(`Слушаем ${PORT} порт`);
  });
}
connectServer();
