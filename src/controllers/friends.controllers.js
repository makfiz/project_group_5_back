const { Friends } = require("../models/friends");

async function getFriends(req, res, next) {
  const ourFriends = await Friends.find();

  return res.status(200).json(ourFriends);
}

module.exports = {
  getFriends,
};
