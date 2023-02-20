// як використати
// в роутах: імпортувати uploadAvatar і додати uploadAvatar.single("avatar") перед використанням контроллера
// в контроллерах: url зображення лежить в req.file.path

const multer = require("multer");
const cloudinary = require("cloudinary").v2;
const { HttpError } = require(".././helpers/httpError");

const { CLOUDINARY_NAME, CLOUDINARY_API_KEY, CLOUDINARY_API_SECRET } =
  process.env;

cloudinary.config({
  cloud_name: CLOUDINARY_NAME,
  api_key: CLOUDINARY_API_KEY,
  api_secret: CLOUDINARY_API_SECRET,
});

const memoryStorage = multer.memoryStorage();

const upload = multer({
  storage: memoryStorage,
});

const uploadToCloudinary = async (fileString, format) => {
  try {
    const { uploader } = cloudinary;

    const res = await uploader.upload(
      `data:avatarURL/${format};base64,${fileString}`,
      {
        transformation: [
          { quality: "auto", crop: "scale" },
          { fetch_format: "auto" },
        ],
      }
    );

    return res;
  } catch (error) {
    throw new HttpError(500, error);
  }
};

module.exports = {
  upload,
  uploadToCloudinary,
};
