const { dbFriends } = require("../models/friends");

async function getFriends(req, res, next) {
  const ourFriends = await dbFriends.find();

  return res.status(200).json(ourFriends);
}

module.exports = {
  getFriends,
};
