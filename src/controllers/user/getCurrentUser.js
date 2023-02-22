// const { dbUsers } = require("../models/user");
const { Pet } = require("../../models/pet");

// const { Conflict, Unauthorized, NotFound } = require('http-errors');

const getCurrentUser = async (req, res, next) => {
  const { avatarURL, name, email, birthday, phone, city, _id: id } = req.user;
  const petList = await Pet.find({ owner: id });

  res.status(200).json({
    user: {
      id,
      name,
      avatarURL,
      email,
      birthday,
      phone,
      city,
    },

    petList,
  });
};

module.exports = getCurrentUser
