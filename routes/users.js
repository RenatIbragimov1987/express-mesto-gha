const express = require("express");
const users = require("express").Router();
const {
  getUsers,
  createUser,
  getUserByID,
  updateUser,
  updateAvatar,
} = require("../controllers/users");

users.get("/users", getUsers);
users.post("/users", express.json(), createUser);
users.get("/users/:userId", getUserByID);
users.patch("/users/me", express.json(), updateUser);
users.patch("/users/me/avatar", express.json(), updateAvatar);

module.exports = users; // экспортировали роутер
