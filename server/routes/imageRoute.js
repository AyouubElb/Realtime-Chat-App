const express = require("express");
const multer = require("multer");
const path = require("path");
const imageModel = require("../models/imageModel");
const fs = require("fs");

const {
  uploadImage,
  getAllImages,
  getImageById,
} = require("../controllers/imageController");

const router = express.Router();

// Set storage engine
const storage = multer.diskStorage({
  destination: "../uploads",
  filename: function (req, file, cb) {
    cb(
      null,
      file.fieldname + "-" + Date.now() + path.extname(file.originalname)
    );
  },
});
// // Init Upload
const upload = multer({
  storage: storage,
  limits: { fileSize: 1000000 },
  // fileFilter: function (req, file, cb) {
  //   checkFileType(file, cb);
  // },
});

router.post("/upload-image", upload.single("myImage"), async (req, res) => {
  try {
    const newImage = new imageModel({
      data: fs.readFileSync("../uploads/" + req.file.filename),
      contentType: "image/jpg",
    });
    await newImage.save();
    res.send("Image Uploaded !!");
  } catch (error) {
    console.log(error);
  }
});
router.get("/", getAllImages);

router.get("/:imageId", getImageById);

module.exports = router;
