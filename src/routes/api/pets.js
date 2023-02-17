const express = require("express");
const validateBody = require('../../middlewares/validateBody');
const { createPetSchema } = require('../../schemas/userPets');
const authIdent = require("../../middlewares/authIdent");
const petRouter = express.Router();

const { tryCatchWrapper } = require("../../helpers");
const {
  deleteUserPet,
  addUserPet,
} = require("../../controllers/pet.controller");

petRouter.use(authIdent);

petRouter.post("/", authIdent, validateBody(createPetSchema), tryCatchWrapper(addUserPet));
petRouter.delete("/:petId", tryCatchWrapper(deleteUserPet));

module.exports = {
  petRouter,
};