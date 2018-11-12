const express = require('express');
const router = express.Router();

/* GET home page */
router.get('/', (req, res, next) => {
  res.render('index');
});

router.get("/firststep", (req, res, next) => {
  res.render("firststep");
});

router.get("/main-page", (req, res, next) => {
  res.render("main-page");
});

router.get("/filtered-page", (req, res, next) => {
  res.render("filtered-page");
});

router.get("/public-profile", (req, res, next) => {
  res.render("public-profile");
});

router.get("/owned-profile", (req, res, next) => {
  res.render("owned-profile");
});

router.get("/check-email", (req, res, next) => {
  res.render("check-email");
});


module.exports = router;
