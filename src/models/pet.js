const mongoose = require("mongoose");

const petSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Name is required.']
    },
    dateOfBirth: {
      type: String,
      required: [true, 'Date of birth is required.']
    },
    breed: {
      type: String,
      required: [true, 'Breed is required.']
    },
    comments: {
      type: String,
      required: [true, 'Comments is required.']
    },
    petImage: {
      type: String
    },
    owner: {
      type: Schema.Types.ObjectId,
      ref: 'user',
    },
  },
  {
    versionKey: false,
    timestamps: true,
  }
);

const Pet = mongoose.model('pet', petSchema);

module.exports = {
    Pet,
}
