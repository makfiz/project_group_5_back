const { Pet } = require('../models/pet');
const { HttpError } = require('../helpers/httpError');
const { uploadToCloudinary } = require('../middlewares/uploadAvatar');
const { bufferToDataURI } = require('../middlewares/upload');

const addUserPet = async (req, res, next) => {
  const owner = req.user.id;
  const myNewPet = await Pet.create({ owner, ...req.body });
  return res.status(201).json({ status: 'success', myNewPet });
};

const deleteUserPet = async (req, res) => {
  const { petId } = req.params;

  const deletedPet = await Pet.findByIdAndRemove(petId);
  if (!deletedPet) {
    throw new HttpError(404, `Pet not found`);
  }

  res.status(200).json({
    _id: petId,
    message: `pet deleted`,
  });
};

const uploadPetImage = async (req, res, next) => {
  const { file } = req;
  const { petId } = req.params;
  if (!file) throw new HttpError(400, 'Image is required');

  const fileFormat = file.mimetype.split('/')[1];
  const { base64 } = bufferToDataURI(fileFormat, file.buffer);

  const imageDetails = await uploadToCloudinary(base64, fileFormat);

  const updatePet = await Pet.findByIdAndUpdate(
    petId,
    { petImage: imageDetails.url },
    { new: true }
  );
  updatePet.petImage = imageDetails.url;
  await updatePet.save();

  return res.json({
    id: updatePet._id,
    petImage: updatePet.petImage,
  });
};

module.exports = {
  addUserPet,
  deleteUserPet,
  uploadPetImage,
};
