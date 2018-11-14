const express = require('express');
const router = express.Router();
const User = require("../models/User");


/* GET home page */
router.get('/', (req, res, next) => {
  res.render('index');
});

router.get("/firststep", (req, res, next) => {
  res.render("firststep");
});

router.get("/filtered-page", (req, res, next) => {
  res.render("filtered-page");
});

// router.get("/public-profile", (req, res, next) => {
//   res.render("public-profile");
// });

router.get("/owned-profile", (req, res, next) => {
  res.render("owned-profile");
});

router.get("/check-email", (req, res, next) => {
  res.render("check-email");
});

router.get("/about", (req, res, next) => {
  res.render("about");
})

module.exports = router;
