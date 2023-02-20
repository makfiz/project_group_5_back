const { dbUsers } = require("../../models/user");
const { HttpError } = require("../../helpers/httpError");
const { changePassword } = require("../../helpers/sendVerifyMail");
const { uploadToCloudinary } = require("../../middlewares/uploadAvatar");
const { bufferToDataURI } = require("../../middlewares/upload");
const bcrypt = require("bcrypt");
const { nanoid } = require("nanoid");

async function updateUser(req, res, next) {
  const { _id } = req.user;

  const result = await dbUsers.findByIdAndUpdate(_id, req.body, { new: true });

  res.json({
    _id: result._id,
    name: result.name,
    email: result.email,
    birthday: result.birthday,
    phone: result.phone,
    city: result.city,
  });
}

async function editAvatar(req, res, next) {
  try {
    const { file } = req;
    const { _id } = req.user;
    if (!file) throw new HttpError(400, "Image is required");

    const fileFormat = file.mimetype.split("/")[1];
    const { base64 } = bufferToDataURI(fileFormat, file.buffer);

    const imageDetails = await uploadToCloudinary(base64, fileFormat);
    avatarUrl = imageDetails.url;

    const result = await dbUsers.findByIdAndUpdate(
      _id,
      { avatarUrl },
      { new: true }
    );

    res.json({
      status: "success",
      message: "Upload successful",
      data: imageDetails,
      avatarUrl: result.avatarUrl,
    });
  } catch (error) {
    next(new HttpError(error.statusCode || 500, error.message));
  }
}

const editPassword = async (req, res) => {
  const { email } = req.body;
  await dbUsers.findOne({ email });

  const newPassword = nanoid();
  const hashPassword = await bcrypt.hash(newPassword, 10);

  const updatedUser = await dbUsers.findOneAndUpdate(
    { email },
    { password: hashPassword }
  );

  if (!updatedUser) {
    throw HttpError(404, "Not found");
  }

  const infoEmail = {
    to: email,
    subject: "Restore access",
    html: `<p>Your new password for petly: ${newPassword}</p> <p>You can change it in your account</p>`,
  };

  await changePassword(infoEmail);
  res.json({ message: "New password was sent on your email" });
};

module.exports = { updateUser, editAvatar, editPassword };
