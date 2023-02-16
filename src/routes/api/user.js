const express = require("express");
const router = express.Router();
const { joiSchemaUser } = require("../../schemas/user");
const { registerUser, loginUser, verifyMail, logoutUser } = require("../../controllers/user");
const { tryCatchWrapper } = require("../../helpers");
const authIdent = require("../../middlewares/authIdent");
const upload = require("../../middlewares/upload");
const validateBody = require("../../middlewares/validateBody");

router.post('/signup', validateBody(joiSchemaUser.register), tryCatchWrapper(registerUser)); 
router.get('/verify/:verificationToken', tryCatchWrapper(verifyMail));
router.post('/login', validateBody(joiSchemaUser.login), tryCatchWrapper(loginUser)); 
router.get('/logout', authIdent, tryCatchWrapper(logoutUser));

module.exports = router;
