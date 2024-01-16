const { expressjwt: jwt } = require("express-jwt");

require("dotenv").config();

// check if the user requested is sign in
exports.requireSignIn = jwt({
  secret: process.env.JWT_SECRET,
  algorithms: ["HS256"],
  userProperty: "auth",
});

exports.isAuth = (req, res, next) => {
  // console.log("auth", req.auth);
  // console.log("profile", req.profile);
  let user = req.profile && req.auth && req.profile._id == req.auth._id;
  if (!user) {
    return res.status(404).json({
      error: "Access Denied",
    });
  }
  next();
};
