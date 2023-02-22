const registerUser = require("./registerUser");
const loginUser = require("./loginUser");
const logoutUser = require("./logoutUser");
const verifyMail = require("./verifyMail");
const againVerifyMail = require("./againVerifyMail");
const getCurrentUser = require("./getCurrentUser");
const {
  updateUser,
  editAvatar,
  restorePassword,
  updatePassword,
} = require("./updateUser");

module.exports = {
  registerUser,
  loginUser,
  logoutUser,
  verifyMail,
  againVerifyMail,
  getCurrentUser,
  updateUser,
  editAvatar,
  updatePassword,
  restorePassword,
};
