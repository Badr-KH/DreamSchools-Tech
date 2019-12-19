const mongoose = require("mongoose");
const School = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  about: {
    type: String,
    required: true
  },
  location: {
    type: String,
    required: true
  },
  admission: {
    type: String,
    required: true
  },
  imageLink: {
    type: String,
    default:
      "https://dreamschoolstest.s3.ca-central-1.amazonaws.com/default.jpg"
  },
  dateCreated: {
    type: Date,
    default: Date.now
  }
});
module.exports = mongoose.model("School", School);
