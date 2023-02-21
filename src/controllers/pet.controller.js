const { Pet } = require('../models/pet');
const { HttpError } = require('../helpers/httpError');
const { uploadToCloudinary } = require("../middlewares/uploadAvatar");
const { bufferToDataURI } = require("../middlewares/upload");

const addUserPet = async (req, res, next) => {
    const owner = req.user.id;
    const { file } = req;

    if (!file) {
      throw new HttpError(400, 'Missing required fields. Provide necessary data.');
    }

    const fileFormat = file.mimetype.split("/")[1];
    const { base64 } = bufferToDataURI(fileFormat, file.buffer);

    const imageDetails = await uploadToCloudinary(base64, fileFormat);
    petImage = imageDetails.url;
    const myNewPet = await Pet.create(owner, req.body, petImage);
    
    return res.status(201).json({ status: 'success', myNewPet });
   
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

const uploadPetImage = async (req, res, next) => {
  const { file } = req;

  const { petId } = req.params;
  if (!file) throw new HttpError(400, "Image is required");
  
  const fileFormat = file.mimetype.split("/")[1];
  const { base64 } = bufferToDataURI(fileFormat, file.buffer);

  const imageDetails = await uploadToCloudinary(base64, fileFormat);

  const updatePet = await Pet.findById(petId, req.body);
  updatePet.petImage = imageDetails.url;
  await updatePet.save();

  return res.json(
    { status: "success",
      petImage: updatePet.petImage }
  )
}
  

module.exports = {
  addUserPet,
  deleteUserPet,
  uploadPetImage,
};
