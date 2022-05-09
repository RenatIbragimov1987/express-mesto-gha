const User = require("../models/user");

const getUsers = async (req, res) => {
  try {
    const users = await User.find({});
    res.status(200).send(users);
  } catch (err) {
    res.status(500).send(`Произошла ошибка: ${err.name} ${err.message}`);
  }
};

const createUser = async (req, res) => {
  try {
    console.log(ValidationError);
    const { name, about, avatar } = req.body;
    const user = new User({ name, about, avatar });
    res.status(201).send(await user.save());
  } catch (err) {
    if (err.name === "ValidationError") {
      res.status(400).send({
        message: `Переданы некорректные данные создания пользователя: ${err.message}`,
      });
      return;
    }
    res.status(500).send(`Произошла ошибка: ${err.name} ${err.message}`);
  }
};

const getUserByID = async (req, res) => {
  try {
    const user = await User.findById(req.params.userId);
    if (!user) {
      res.status(404).send({ message: "Пользователь не найден" });
      return;
    }
    res.status(200).send(user);
  } catch (err) {
    if (err.name === "CastError") {
      res.status(400).send({
        message: `Переданы некорректные данные id: ${err.name} - ${err.message}`,
      });
      return;
    }
    res.status(500).send(`Произошла ошибка: ${err.name} ${err.message}`);
  }
};

const updateUser = async (req, res) => {
  try {
    const { name, about } = req.body;
    const user = await User.findByIdAndUpdate(
      req.user._id,
      { name, about },
      { new: true, runValidators: true }
    );
    res.status(200).send(user);
  } catch (err) {
    if (err.name === "ValidationError") {
      res.status(400).send({
        message: `Переданы некорректные данные пользователя: ${err.message}`,
      });
      return;
    }
    res.status(500).send(`Произошла ошибка: ${err.name} ${err.message}`);
  }
};

const updateAvatar = async (req, res) => {
  const { avatar } = req.body;
  try {
    const user = await User.findByIdAndUpdate(
      req.user._id,
      { avatar },
      { new: true }
    );
    res.status(200).send(user);
  } catch (err) {
    if (err.name === "ValidationError") {
      res.status(400).send({
        message: `Переданы некорректные данные аватара: ${err.message}`,
      });
      return;
    }
    res.status(500).send(`Произошла ошибка: ${err.name} ${err.message}`);
  }
};

module.exports = {
  getUsers,
  getUserByID,
  createUser,
  updateUser,
  updateAvatar,
};
