const mongoose = require("mongoose");

// const emailRegExp = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
// const emailRegExp = /^[a-z0-9!#$%&'+/=?^_`{|}~-]+(?:.[a-z0-9!#$%&'+/=?^_`{|}~-]+)@(?:[a-z0-9](?:[a-z0-9-][a-z0-9])?.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
const emailRegExp =
  /^[^!@#$%^&*()+\-=\[\]{};':"\\|,.<>\/?]*(([^<>()[\]\\.,;\s@"]+(\.[^<>()[\]\\.,;\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z0-9]+\.)+[a-zA-Z]{2,}))$/;
const passRegExp = /^[^\s]{7,32}$/;
const nameRegExp = /^(?![\d+_@.-]+$)[a-zA-Z0-9+_@.-]*$/;
const cityRegExp = /^[a-zA-Zа-яА-ЯіІїЇґҐ']+(?:[\s-][a-zA-Zа-яА-ЯіІїЇґҐ']+)*,\s*[a-zA-Zа-яА-ЯіІїЇґҐ']+(?:[\s-][a-zA-Zа-яА-ЯіІїЇґҐ']+)*$/;
const phoneRegExp = /^\+380\d{9}$/;
const birthdayRegExp = /^(0?[1-9]|[1-2][0-9]|3[0-1])\.(0?[1-9]|1[0-2])\.\d{4}$/;


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
      match: passRegExp,
      minlength: 7,
      maxlength: 32,
      required: [true, "Password is required"],
    },
    name: {
      type: String,
      match: nameRegExp,
      required: [true, "Name is required"],
    },
    city: {
      type: String,
      match: cityRegExp,
      // required: [true, "City/Region is required"],
      default: "",
    },
    phone: {
      type: String,
      match: phoneRegExp,
      minlength: 12,
      default: "",
    },
    birthday: {
      type: String,
      match: birthdayRegExp,
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
