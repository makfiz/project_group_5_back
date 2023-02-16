const mongoose = require("mongoose");

const schema = mongoose.Schema(
  {
    title: {
      type: String,
    },
    url: {
      type: String,
    },
    addressUrl: {
      type: String,
    },
    imageUr: {
      type: String,
    },
    address: {
      type: String,
    },
    workDays: [
      {
        isOpen: Boolean,
        from: String,
        to: String,
      },
    ],
    phone: {
      type: String,
    },
    email: {
      type: String,
    },
  },
  {
    versionKey: false,
    timestamps: true,
  }
);

const Friends = mongoose.model("sponsors", schema);

module.exports = {
  Friends,
};
