const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const { auth } = require("express-oauth2-jwt-bearer");
const Guard = require("express-jwt-permissions")();

const jwtCheck = auth({
  audience: "https://chat-app-api.com",
  issuerBaseURL: "https://dev-b74oodakknrmub4t.us.auth0.com/",
  tokenSigningAlg: "RS256",
});

// Import Routes
const userRoutes = require("./routes/userRoute");
const chatRoutes = require("./routes/chatRoute");
const messageRoutes = require("./routes/messageRoute");
const imageRoutes = require("./routes/imageRoute");

// config app
const app = express();
require("dotenv").config();

// Middleware

app.use(cors());
app.use(express.json());
// enforce on all endpoints
// app.use(jwtCheck);

// app.get("/Test", Guard.check(["read: userInfo"]), (req, res) => {
//   res.send("Secured Resource");
// });

// Routes Middleware
app.use("/api/users", userRoutes);
app.use("/api/chats", chatRoutes);
app.use("/api/messages", messageRoutes);
app.use("/api/images", imageRoutes);

//Run the app
const port = process.env.PORT || 5000;

// DB mongodb
mongoose
  .connect(process.env.ATLAS_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(async () => {
    console.log("Database is connected ...");
    // Save the images to the "uploads" directory
    // uploadImages();
  })
  .catch((err) => console.log(`Database could not connect ... ${err}`));

app.listen(port, () => console.log(`App is running on port : ${port}`));
