const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const multer = require("multer");
const path = require("path");

// Import Routes
const userRoutes = require("./routes/userRoute");
const chatRoutes = require("./routes/chatRoute");
const messageRoutes = require("./routes/messageRoute");

// config app
const app = express();
require("dotenv").config();
/********************* */

// Set storage engine
// const storage = multer.diskStorage({
//   destination: "./public/uploads",
//   filename: function (req, file, cb) {
//     cb(
//       null,
//       file.fieldname + "-" + Date.now() + path.extname(file.originalname)
//     );
//   },
// });

// // Init Upload
// const upload = multer({
//   storage: storage,
//   limits: { fileSize: 1000000 },
//   // fileFilter: function (req, file, cb) {
//   //   checkFileType(file, cb);
//   // },
// }).single("myImage");

// // CHeck File Type
// function checkFileType(file, cb) {
//   // Allowed extentions
//   const fileTypes = /jpeg|jpg|png|gif/;
//   // Check ext
//   const extname = fileTypes.test(path.extname(file.originalname).toLowerCase());
//   // Check mime
//   const mimeType = fileTypes.test(file.mimeType);
//   if (mimeType && extname) {
//     return cb(null, true);
//   } else {
//     cb("Error: Images Only!");
//   }
// }

// // public folder
// app.use(express.static("./public"));

// // app.post("/upload", (req, res) => {
// //   upload(req, res, (err) => {
// //     if (err) {
// //       res.status(500).json(err);
// //       // res.render("index", {
// //       //   msg: err,
// //       // });
// //     } else {
// //       console.log(req.file);
// //       res.send("test");
// //     }
// //   });
// // });

// const imageModel = require("./models/imageModel");

// app.post("/upload-image", upload, async (req, res) => {
//   console.log(req.file);
//   res.send("Uploaded!!");
//   const imageName = req.file.filename;
//   try {
//     await imageModel.create({ image: imageName });
//     res.send("Image Uploaded successfully!");
//   } catch (error) {
//     // res.status(500).json(error);
//   }
// });

// app.get("/get-image", async (req, res) => {
//   try {
//     const images = await imageModel.find({});
//     res.send(images);
//   } catch (error) {
//     console.log(error);
//   }
// });

// const storage = multer.diskStorage({
//   destination: function (req, file, cb) {
//     cb(null, "uploads/");
//   },
//   filename: function (req, file, cb) {
//     cb(
//       null,
//       file.fieldname + "-" + Date.now() + path.extname(file.originalname)
//     );
//   },
// });

// const upload = multer({ storage: storage });

/********************* */
// Middleware
app.use(bodyParser.json({ limit: "50mb" }));
app.use(bodyParser.urlencoded({ limit: "50mb", extended: true }));

// Parse base64 encoded data
app.use(bodyParser.raw({ limit: "50mb", type: "image/*" }));
app.use(cors());
app.use(express.json());

// Routes Middleware
app.use("/api/users", userRoutes);
app.use("/api/chats", chatRoutes);
app.use("/api/messages", messageRoutes);

//Run the app
const port = process.env.PORT || 5000;

// DB mongodb
mongoose
  .connect(process.env.ATLAS_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(console.log("Database is connected ..."))
  .catch((err) => console.log(`Database could not connect ... ${err}`));

app.listen(port, () => console.log(`App is running on port : ${port}`));
