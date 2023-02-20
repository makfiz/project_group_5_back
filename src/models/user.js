const mongoose = require("mongoose");
const Joi = require("joi");

// const emailRegExp = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
const emailRegExp =
  /^[a-z0-9!#$%&'+/=?^_`{|}~-]+(?:.[a-z0-9!#$%&'+/=?^_`{|}~-]+)@(?:[a-z0-9](?:[a-z0-9-][a-z0-9])?.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;

const schema = mongoose.Schema(
  {
    email: {
      type: String,
      match: emailRegExp, // валідація згідно регулярного виразу
      required: [true, "Email is required"],
      unique: true,
    },
    password: {
      type: String,
      minlength: 7,
      required: [true, "Password is required"],
    },
    name: {
      type: String,
      required: [true, "Name is required"],
    },
    city: {
      type: String,
      // required: [true, "City/Region is required"],
      default: "",
    },
    phone: {
      type: String,
      // required: [true, "Mobile phone is required"],
      default: "",
    },
    birthday: {
      type: String,
      default: "",
    },
    avatarURL: {
      type: String,
      default: "",
    },
    token: {
      type: String,
      default: null,
    },
    verifyEmail: {
      type: Boolean,
      default: false,
    },
    verificationToken: {
      type: String,
      required: [true, "Verify token is required"],
    },
  },
  {
    versionKey: false,
    minimize: false,
  }
);

mongoose.Schema.Types.String.checkRequired(
  (verificationToken) => verificationToken != null
);
const dbUsers = mongoose.model("users", schema);

module.exports = {
  dbUsers,
};
