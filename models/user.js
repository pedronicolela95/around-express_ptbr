const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 30,
  },
  about: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 30,
  },
  avatar: {
    type: String,
    validate: {
      validator(v) {
        const regex = /^https?:\/\/(www\.)?[a-zA-Z0-9-]+(\.[a-zA-Z0-9-]+)*\.[a-zA-Z]{2,}/;
        return regex.test(v);
      },
      message: (props) => `${props.value} não é uma URL válida`,
    },
    required: true,
  },
});

module.exports = mongoose.model("user", userSchema);
