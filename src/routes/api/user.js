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
  updateUser,
  googleAuthUser
} = require("../../controllers/user");

const { tryCatchWrapper } = require("../../helpers");
const authIdent = require("../../middlewares/authIdent");
const passport = require("../../middlewares/authUserGoogle");
// const upload = require("../../middlewares/upload");
const validateBody = require("../../middlewares/validateBody");

authRouter.post(
  "/signup",
  validateBody(joiSchemaUser.register),
  tryCatchWrapper(registerUser)
);
authRouter.get("/google", passport.authenticate("google", { scope: ["email", "profile"] }));
authRouter.get("/google/callback", passport.authenticate("google", {session: false}), tryCatchWrapper(googleAuthUser));
authRouter.get("/verify/:verificationToken", tryCatchWrapper(verifyMail));
authRouter.post("/verify", tryCatchWrapper(againVerifyMail));
authRouter.post(
  "/login",
  validateBody(joiSchemaUser.login),
  tryCatchWrapper(loginUser)
);
authRouter.get("/logout", authIdent, tryCatchWrapper(logoutUser));
authRouter.get("/me", authIdent, tryCatchWrapper(getCurrentUser));
authRouter.patch(
  "/update",
  authIdent,
  validateBody(joiSchemaUser.update),
  tryCatchWrapper(updateUser)
);

module.exports = {
  authRouter,
};
