const express = require("express");
const router = express.Router();

const { getCurrentUser } = require("../../controllers/user.controller");
// const { tryCatchWrapper } = require('../../helpers');
// const { validateBody } = require('../../middlewares');

// const {} = require('../../schemas/user');

router.get("/me", getCurrentUser);

module.exports = router;
