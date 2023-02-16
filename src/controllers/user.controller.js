const { dbUsers } = require("../models/user");
// const { Conflict, Unauthorized, NotFound } = require('http-errors');

const getCurrentUser = async (req, res, next) => {
  try {
    const { avatar, name, email, birthday, phone, city, _id: id } = req.user;
    const petList = await dbUsers.find({ owner: id });

    res.json({
      data: {
        user: {
          avatar,
          name,
          email,
          phone,
          city,
        },
        pets: {
          petList,
        },
      },
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getCurrentUser,
};
