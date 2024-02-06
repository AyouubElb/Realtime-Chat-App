const mongoose = require("mongoose");

const userSchema = mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      minlength: 3,
      maxlength: 25,
    },
    email: {
      type: String,
      required: true,
      trim: true,
      minlength: 10,
      maxlength: 100,
      unique: true,
    },
    password: {
      type: String,
      required: true,
      minlength: 8,
      maxlength: 1024,
      unique: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", userSchema);
