const express = require('express');
// const { celebrate, Joi } = require('celebrate');

const users = express.Router();
const {
  getUsers,
  getUserByID,
  currentUser,
  updateUser,
  updateAvatar,
} = require('../controllers/users');

users.get('/users/:userId', getUserByID);
// celebrate({
//   params: Joi.object().keys({
//     userId: Joi.string().length(24).hex().required(),
//   }),
// }),

users.patch('/users/me', updateUser);
// celebrate({
//   body: Joi.object().keys({
//     name: Joi.string().min(2).max(30),
//     about: Joi.string().min(2).max(30),
//   }),
// }),

users.patch('/users/me/avatar', updateAvatar);
// celebrate({
//   body: Joi.object().keys({

//   }),
// }),

users.get('/users/me', currentUser);
users.get('/users', getUsers);

module.exports = { users };
