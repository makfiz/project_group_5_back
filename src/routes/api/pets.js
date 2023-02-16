const express = require("express");
const petRouter = express.Router();

const { tryCatchWrapper } = require("../../helpers");
const {
  deleteUserPet,
  addUserPet,
} = require("../../controllers/pet.controller");

petRouter.post("/", tryCatchWrapper(addUserPet));
petRouter.delete("/:petId", tryCatchWrapper(deleteUserPet));

module.exports = {
  petRouter,
};
