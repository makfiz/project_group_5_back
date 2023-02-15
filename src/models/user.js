const mongoose = require('mongoose');

const schema = mongoose.Schema(
  {},
  {
    versionKey: false,
    minimize: false,
  }
);
mongoose.Schema.Types.String.checkRequired(
  verificationToken => verificationToken != null
);
const dbUsers = mongoose.model('users', schema);

module.exports = {
  dbUsers,
};
