const { Pet } = require('../models/pet');
const { HttpError } = require('../helpers/httpError');
const { dbUsers } = require('../models/user');


const addUserPet = async (req, res) => {
    const { _id: owner } = req.user;
    const newMyPet = await Pet.create({
        ...req.body,
        owner,
    });

    if (!newMyPet) {
    throw new HttpError(400, `Unable to create new Pet`)
    }
    await dbUsers.updateOne({ _id: owner.id }, { $push: { pets: newMyPet._id}})
    res.status(201).json(newMyPet);
}

const deleteUserPet = async (req, res) => {
    const { petId } = req.params;
    const deletedPet = await Pet.findByIdAndRemove(petId);
    if (!deletedPet) {
    throw new HttpError(404, `Pet not found`)
    }
    await dbUsers.updateOne({ _id: deletedPet.owner.id }, { $pull: { pets: { $in: [deletedPet._id] } } });

}

module.exports = {
    addUserPet,
    deleteUserPet,
}



