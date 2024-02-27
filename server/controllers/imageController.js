const imageModel = require("../models/imageModel");
const formidable = require("formidable");
const fs = require("fs");
const path = require("path");

exports.uploadImage = async (req, res) => {
  try {
    let form = new formidable.IncomingForm();
    form.keepExtensions = true;

    form.parse(req, (err, fields, files) => {
      console.log("files", files);
      if (err) {
        console.log("Formidable Error:", err);
        return res.status(400).json({
          error: "Image could not uploaded !",
        });
      }

      if (files.image) {
        if (files.image.size > Math.pow(10, 6)) {
          return res.status(400).json({
            error: "Image should be less than 1mb in size",
          });
        }

        let image = new imageModel();
        image.data = fs.readFileSync(files.image[0].filepath);
        image.contentType = files.image[0].mimetype;

        image.save();
        res.status(200).send({ image: image });
      }
    });
  } catch (error) {
    console.error("Error uploading image:", error);
    res.status(500).json({ error });
  }
};

exports.getAllImages = async (req, res) => {
  try {
    const images = await imageModel.find();
    res.send(images);
  } catch (error) {
    console.error("Error fetching images:", error);
    res.status(500).json({ error: "Error fetching images" });
  }
};

exports.getImageById = async (req, res) => {
  try {
    const id = req.params.imageId;
    const image = await imageModel.findById(id);
    res.send(image);
  } catch (error) {
    console.log(error.message);
    res.status(500).json(error.message);
  }
};
