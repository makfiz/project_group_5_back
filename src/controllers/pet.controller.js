const { Pet } = require("../models/pet");
const { HttpError } = require("../helpers/httpError");
const { dbUsers } = require("../models/user");

const addUserPet = async (req, res) => {
  const owner = req.user.id;
  const petData = req.body;
  const data = !!req.file
    ? { petImage: req.file.path, owner, ...petData }
    : { owner, ...petData };

  await Pet.create(data)
    .then((pet) => {
      if (pet) {
      dbUsers.findByIdAndUpdate(owner, { $push: { pets: pet._id } })
          .then((user) => {
            if (user) {
              res.status(201).json(pet);
            }
          })
          .catch((err) => {
            throw new Error(err);
          });
      }
    })
    .catch((err) =>
      res.status(400).json({ message: "Unable to create new Pet" })
  );
}


const deleteUserPet = async (req, res) => {
  const { petId } = req.params;
 
  const deletedPet = await Pet.findByIdAndRemove(petId);
  if (!deletedPet) {
    throw new HttpError(404, `Pet not found`);
  }
  await dbUsers.updateOne(
    { _id: deletedPet.owner },
    { $pull: { pets: { $in: [deletedPet._id] } } }
  );
  res.json({
    message: `pet deleted`,
  });
};

module.exports = {
  addUserPet,
  deleteUserPet,
};
