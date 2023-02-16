const express = require("express");
const authRouter = express.Router();

const { getCurrentUser } = require("../../controllers/user.controller");
const { tryCatchWrapper } = require("../../helpers");
// const { validateBody } = require('../../middlewares');

// const {} = require('../../schemas/user');

authRouter.get("/me", tryCatchWrapper(getCurrentUser));

module.exports = {
  authRouter,
};
