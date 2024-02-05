const express = require("express");

const {
  registration,
  loginUser,
  signout,
  findUser,
  updateUser,
  getAllUsers,
} = require("../controllers/userController");

const { requireSignIn, isAuth } = require("../middlewares/auth");

const { userById } = require("../middlewares/user");

const router = express.Router();

router.post("/register", registration);

router.post("/login", loginUser);

router.get("/signout", signout);

router.get("/find/:userId", findUser);

router.put("/update/:userId", updateUser);

router.get("/", requireSignIn, getAllUsers);

router.param("userId", userById);

module.exports = router;
