const { dbUsers } = require("../../models/user");
const { HttpError } = require("../../helpers/httpError");
const { sendVerifyMail } = require("../../helpers/sendVerifyMail");

const againVerifyMail = async (req, res) => {
  const { email } = req.body;

  if (!email) {
    throw new HttpError(400, "request body missing required field email");
  }

  const user = await dbUsers.findOne({
    email: email,
  });

  if (!user) {
    throw new HttpError(404, error.message);
  };

  const { verifyEmail, verificationToken, name } = user;
  if (verifyEmail) {
    throw new HttpError(400, "Verification has already been passed");
  }

  await sendVerifyMail(email, verificationToken, name);
  res.status(200).json({ message: "Verification email sent" });
};

module.exports = againVerifyMail;