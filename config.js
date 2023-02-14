const dotenv = require('dotenv');
dotenv.config();
const { HOST_URI, JWT_SECRET, PORT, AUTHMetaPass } = process.env;
module.exports = {
  HOST_URI,
  JWT_SECRET,
  PORT,
};
