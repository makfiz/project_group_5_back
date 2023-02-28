const { Schema, model } = require('mongoose');

const notice = new Schema(
  {
    category: {
      type: String,
      enum: ['sell', 'lost_found', 'in_good_hands'],
      required: [true, 'Category is required'],
    },
    title: {
      type: String,
      minLength: 2,
      maxLength: 48,
      required: [true, 'Title is required'],
    },
    name: {
      type: String,
      minLength: 2,
      maxLength: 16,
    },
    birth: {
      type: String,
    },
    breed: {
      type: String,
      minLength: 2,
      maxLength: 24,
    },
    sex: {
      type: String,
      enum: ['male', 'female'],
      required: [true, 'The sex is required'],
    },
    location: {
      type: String,
      required: [true, 'Place is required'],
    },
    price: {
      type: String,
      required: [true, 'Price is required'],
    },
    photoURL: {
      type: String,
      default: '',
    },
    comments: {
      type: String,
      minLength: 8,
      maxLength: 120,
    },
    favoritesIn: {
      type: Array,
    },

    owner: {
      type: Schema.Types.ObjectId,
      ref: 'users',
    },
  },
  { versionKey: false, timestamps: true }
);

const dbNotice = model('notice', notice);
module.exports = { dbNotice };
