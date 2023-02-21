const express = require("express");
const validateBody = require("../../middlewares/validateBody");
const { createPetSchema } = require("../../schemas/userPets");
const authIdent = require("../../middlewares/authIdent");
const { upload } = require('../../middlewares/uploadAvatar');
const petRouter = express.Router();

const { tryCatchWrapper } = require("../../helpers");
const {
  deleteUserPet,
  addUserPet,
} = require("../../controllers/pet.controller");

petRouter.use(authIdent);

petRouter.post(
  "/",
  authIdent,
  upload.single("avatar"),
  validateBody(createPetSchema),
  tryCatchWrapper(addUserPet)
);
petRouter.delete("/:petId", tryCatchWrapper(deleteUserPet));

module.exports = {
  petRouter,
};
