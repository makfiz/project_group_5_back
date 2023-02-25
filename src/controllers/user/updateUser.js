const { dbUsers } = require('../../models/user');
const { HttpError } = require('../../helpers/httpError');
const { uploadToCloudinary } = require('../../middlewares/uploadAvatar');
const { bufferToDataURI } = require('../../middlewares/upload');
const { sendChangePassword } = require('../../helpers/sendVerifyMail');
const { nanoid } = require('nanoid');
const bcrypt = require('bcrypt');

const { FROM_EMAIL } = process.env;

async function updateUser(req, res, next) {
  const { _id } = req.user;

  const result = await dbUsers.findByIdAndUpdate(_id, req.body, { new: true });

  if (!result) {
    next(HttpError(404, 'Not found'));
  }
  res.status(200).json({
    _id: result._id,
    name: result.name,
    email: result.email,
    birthday: result.birthday,
    phone: result.phone,
    city: result.city,
    avatarURL: result.avatarURL,
  });
}

async function editAvatar(req, res, next) {
  try {
    const { file } = req;
    const { _id } = req.user;
    if (!file) throw new HttpError(400, 'Image is required');

    const fileFormat = file.mimetype.split('/')[1];
    const { base64 } = bufferToDataURI(fileFormat, file.buffer);

    const imageDetails = await uploadToCloudinary(base64, fileFormat);
    const avatarURL = imageDetails.url;

    await dbUsers.findByIdAndUpdate(_id, { avatarURL });

    res.json({
      avatarURL,
    });
  } catch (error) {
    next(new HttpError(error.statusCode || 500, error.message));
  }
}

const updatePassword = async (req, res) => {
  const { _id } = req.user;
  const { password, newPassword } = req.body;

  const user = await dbUsers.findById(_id);
  if (!user) {
    throw HttpError(400, 'Not found');
  }

  const passwordCompare = await bcrypt.compare(password, user.password);
  if (!passwordCompare) {
    throw HttpError(400, 'Password is wrong');
  }

  const hashPassword = await bcrypt.hash(newPassword, 10);
  await dbUsers.findByIdAndUpdate(_id, { password: hashPassword });

  res.json({ message: 'Password updated successfully' });
};

const restorePassword = async (req, res, toEmail) => {
  const { email } = req.body;
  await dbUsers.findOne({ email });

  const newPassword = nanoid();
  const hashPassword = await bcrypt.hash(newPassword, 10);

  const updatedUser = await dbUsers.findOneAndUpdate(
    { email },
    { password: hashPassword }
  );

  if (!updatedUser) {
    throw HttpError(404, 'Not found');
  }

  const infoEmail = {
    from: FROM_EMAIL,
    to: toEmail,
    subject: 'Restore access',
    html: `<p>Your new password for petly: ${newPassword}</p> <p>You can change it in your account</p>`,
  };

  await sendChangePassword(infoEmail);
  res.json({ message: 'New password was sent on your email' });
};

module.exports = { updateUser, editAvatar, updatePassword, restorePassword };
