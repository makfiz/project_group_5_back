const express = require("express");
const { getFriends } = require("../../controllers/friends.controllers");
const { tryCatchWrapper } = require("../../helpers");

const friendsRouter = express.Router();

friendsRouter.get("/", tryCatchWrapper(getFriends));

module.exports = {
  friendsRouter,
};
