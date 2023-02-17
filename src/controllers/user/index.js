const registerUser = require("./registerUser");
const loginUser = require("./loginUser");
const logoutUser = require("./logoutUser");
const verifyMail = require("./verifyMail");
const againVerifyMail = require("./againVerifyMail");
const getCurrentUser = require("./getCurrentUser");

module.exports = {
	registerUser,
	loginUser,
	logoutUser,
	verifyMail,
	againVerifyMail,
	getCurrentUser
}