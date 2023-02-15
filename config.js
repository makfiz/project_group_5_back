const dotenv = require('dotenv');
dotenv.config();
const { HOST_URI, PORT,  } = process.env;
module.exports = {
  HOST_URI,
  PORT,
};
