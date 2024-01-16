const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");

// Import Routes
const userRoutes = require("./routes/userRoute");
const chatRoutes = require("./routes/chatRoute");
const messageRoutes = require("./routes/messageRoute");

// config app
const app = express();
require("dotenv").config();

// Middleware
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
