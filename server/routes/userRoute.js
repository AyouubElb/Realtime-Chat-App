const express = require("express");

const {
  registration,
  loginUser,
  signout,
  findUser,
  updateUser,
  updateUserPassword,
  getAllUsers,
} = require("../controllers/userController");

const { validateAccessToken } = require("../middlewares/auth0.middleware");

const { requireSignIn, isAuth } = require("../middlewares/auth");

const { userById } = require("../middlewares/user");

const router = express.Router();

router.post("/register", registration);

router.post("/login", loginUser);

router.get("/signout", signout);

router.get("/find/:userId", findUser);

router.put("/update/:userId", updateUser);

router.put("/update-user-password/:userId", updateUserPassword);

router.get("/", validateAccessToken, getAllUsers);

router.param("userId", userById);

module.exports = router;
