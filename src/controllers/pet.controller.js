const { Pet } = require('../models/pet');
const { HttpError } = require('../helpers/httpError');
// const { dbUsers } = require("../models/user");

const addUserPet = async (req, res) => {
  const owner = req.user.id;
  const petData = req.body;
  const data = req.file
    ? { petImage: req.file.path, owner, ...petData }
    : { owner, ...petData };

  const newMyPet = await Pet.create(data);
  if (!newMyPet) {
    throw new HttpError(400, `Unable to create new Pet`);
  }

  res.status(201).json(newMyPet);
};

const deleteUserPet = async (req, res) => {
  const { petId } = req.params;

  const deletedPet = await Pet.findByIdAndRemove(petId);
  if (!deletedPet) {
    throw new HttpError(404, `Pet not found`);
  }

  res.status(200).json({
    message: `pet deleted`,
  });
};

module.exports = {
  addUserPet,
  deleteUserPet,
};
