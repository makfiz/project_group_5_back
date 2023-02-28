const { dbUsers } = require("../../models/user");
const { HttpError } = require("../../helpers/httpError");
const http = require('http');

async function verifyMail(req, res, next) {
  const { verificationToken } = req.params;

  const user = await dbUsers.findOne({
    verificationToken: verificationToken,
  });

  if (!user) {
    throw new HttpError(404, error.message);
  };

  await dbUsers.findByIdAndUpdate(user._id, {
    verifyEmail: true,
    verificationToken: "",
  });

  res.setHeader('Content-Type', 'text/html');
  res.write(`<html><body><h1>PETLY</h1><h3>${user.name} your email has been successfully verified. Registration successfully completed. Now you can login.</h3></body></html>`);
  res.end();
}

module.exports = verifyMail;
