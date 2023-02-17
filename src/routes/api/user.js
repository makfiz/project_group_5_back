const express = require("express");

const authRouter = express.Router();
const { joiSchemaUser } = require("../../schemas/user");
const {
  registerUser,
  loginUser,
  verifyMail,
  logoutUser,
  againVerifyMail,
  getCurrentUser,
} = require("../../controllers/user");

const { tryCatchWrapper } = require("../../helpers");
const authIdent = require("../../middlewares/authIdent");
// const upload = require("../../middlewares/upload");
const validateBody = require("../../middlewares/validateBody");

authRouter.post(
  "/signup",
  validateBody(joiSchemaUser.register),
  tryCatchWrapper(registerUser)
);
authRouter.get("/verify/:verificationToken", tryCatchWrapper(verifyMail));
authRouter.post('/verify', tryCatchWrapper(againVerifyMail));
authRouter.post(
  "/login",
  validateBody(joiSchemaUser.login),
  tryCatchWrapper(loginUser)
);
authRouter.get("/logout", authIdent, tryCatchWrapper(logoutUser));
authRouter.get("/me", authIdent, tryCatchWrapper(getCurrentUser));

module.exports = {
  authRouter,
};
