const { Schema, model } = require("mongoose");

const notice = new Schema(
  {
    categoty: {
      type: String,
      enum: ["sell", "lost/found", "in good hands"],
      required: [true, "Category is required"],
    },
    title: {
      type: String,
      minLength: 2,
      maxLength: 48,
      required: [true, "Title is required"],
    },
    name: {
      type: String,
      minLength: 2,
      maxLength: 16,
    },
    bitrh: {
      type: Date,
      // TODO: add Date format
    },
    breed: {
      type: String,
      minLength: 2,
      maxLength: 24,
    },
    sex: {
      type: String,
      enum: ["male", "female"],
      required: [true, "The sex is required"],
    },
    location: {
      type: String,
      required: [true, "Place is required"],
      //   TODO: строка в форматі Місто, Область. Наприклад: Brovary, Kyiv або Akhtyrka, Sumy
    },
    price: {
      type: Number,
      required: [true, "Price is required"],
      //   TODO: число, не повинно починатися 0 - (required)
    },
    photoURL: {
      type: String,
    },
    comments: {
      type: String,
      minLength: 8,
      maxLength: 24,
    },
    favoritesIn: {
      type: Array,
    },

    owner: {
      type: Schema.Types.ObjectId,
      ref: "user",
    },
  },
  { versionKey: false, timestamps: true }
);

const dbNotice = model("notice", notice);
module.exports = { dbNotice };
