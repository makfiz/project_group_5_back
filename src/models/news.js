const mongoose = require("mongoose");

const schema = mongoose.Schema({
    title: {
        type: String,
        minLength: 2,
        required: [true, "Title is required"],
    },
    url: {
        type: String,
        minLength: 2,
        required: [true, "URL is required"],
    },
    description: {
        type: String,
        minLength: 10,
        required: [true, "Description is required"],
    },
        date: {
        type: Date,
        required: [true, "Date is required"],
    },
},
  {
    versionKey: false,
    timestamps: true,
  }
);

const dbNews = mongoose.model("news", schema);

module.exports = {
    dbNews,
};
