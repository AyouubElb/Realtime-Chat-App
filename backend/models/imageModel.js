const mongoose = require("mongoose");

const imageSchema = mongoose.Schema(
  {
    image: String,
  },
  //   {
  //     collection: "ImageDetails",
  //   },
  { timestamps: true }
);

module.exports = mongoose.model("Image", imageSchema);
