const express = require("express");
const { PORT = 3000 } = process.env;
const app = express();
const mongoose = require("mongoose");
const users = require("./routes/users");
const cards = require("./routes/cards");

app.use("/", users);
app.use("/", cards);

app.get("/", (req, res) => {
  res.send(req.body);
});

app.use((req, res, next) => {
  req.user = {
    _id: "627835b5ee424cc54107062c",
  };
  next();
});

app.use((req, res, next) => {
  res.status(404).send({ message: "Запрошен несуществующий маршрут" });
  next();
});

(async function connectServer() {
  try {
  await mongoose.connect("mongodb://localhost:27017/mestodb", {
    useNewUrlParser: true,
    useUnifiedTopology: false,
  });
  app.listen(PORT, () => {
    console.log(`Слушаем ${PORT} порт`);
  });
  } catch(err) {
    console.log(`При выполнении кода произошла ошибка ${err.name} ${err.message}`)
  }
})();
