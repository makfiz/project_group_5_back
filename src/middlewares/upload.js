const multer = require("multer");
const path = require("path");

const tmpPath = path.join(__dirname, "../", "tmp");

const multerConfig = multer.diskStorage({
	destination: (req, file, cb)=> {
		cb(null, tmpPath)
	},
	filename: (req, file, cb)=> {
		cb(null, file.originalname)
	}
})

const upload = multer({
	storage: multerConfig,
})

module.exports = upload;