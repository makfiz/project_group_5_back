// як використати
// в роутах: імпортувати uploadAvatar і додати uploadAvatar.single("avatar") перед використанням контроллера
// в контроллерах: url зображення лежить в req.file.path

const multer = require("multer");
const cloudinary = require("cloudinary").v2;
const { CloudinaryStorage } = require("multer-storage-cloudinary");

const { CLOUDINARY_NAME, CLOUDINARY_API_KEY, CLOUDINARY_API_SECRET } =
  process.env;

cloudinary.config({
  cloud_name: CLOUDINARY_NAME,
  api_key: CLOUDINARY_API_KEY,
  api_secret: CLOUDINARY_API_SECRET,
});

const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  folder: "avatar",
  allowedFormats: ["jpg", "png"],
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
});

const uploadAvatar = multer({ storage });

module.exports = {
  uploadAvatar,
};
