const express = require("express");
const passport = require('passport');
const router = express.Router();
const User = require("../models/User");
const nodemailer = require('nodemailer');


// Bcrypt to encrypt passwords
const bcrypt = require("bcrypt");
const bcryptSalt = 10;


let transporter = nodemailer.createTransport({
  service: 'Gmail',
  auth: {
    user: process.env.GMAIL_MAIL,
    pass: process.env.GMAIL_PW 
  }
});

/* req.login(user, function(err) {
  if (err) { return next(err); }
  return res.redirect('/firststep/' + req.user._id);
}); */

router.get("/login", (req, res, next) => {
  res.render("auth/login", { "message": req.flash("error") });
});

/* We need to make sure that this will only be true if the status is something like:
Never logged in before */
router.post("/login", passport.authenticate("local", {
  successRedirect: "/",
  failureRedirect: "/auth/login",
  failureFlash: true,
  passReqToCallback: true
}));

router.get("/signup", (req, res, next) => {
  res.render("auth/signup");
});

router.post("/signup", (req, res, next) => {
  const username = req.body.username;
  const password = req.body.password;
  const email = req.body.email;
  if (username === "" || password === "") {
    res.render("auth/signup", { message: "Indicate username and password" });
    return;
  }

  User.findOne({ username }, "username", (err, user) => {
    if (user !== null) {
      res.render("auth/signup", { message: "The username already exists" });
      return;
    }

    const salt = bcrypt.genSaltSync(bcryptSalt);
    const hashPass = bcrypt.hashSync(password, salt);

    const newUser = new User({
      username,
      password: hashPass,
      email
    });

    

    newUser.save()
    .then(() => {
      res.redirect("/"); //redirect to a message page to check your mail (online)
    })
    .then(() => {
      transporter.sendMail({
        from: '"AMALGAMATE" <ironhack.amalgamate@gmail.com>',
        to: email, 
        subject: 'Activate AMALGAMATE', 
        text: 'Awesome Message',
        html: `Welcome to Amalgamate!
        In order to get started, just click the link and follow the instructions.
        <a href='http://localhost:3000/validate?secret=${123456789}'>Follow me!</a>`
    })
  })
    
    .catch(err => {
      res.render("auth/signup", { message: "Something went wrong" });
    })
  });
});

router.get("/validate", (req, res, next) => {
  //TODO: find the user where secret is req.query.secret and change its status
  req.login(user, function(err) {
    if (err) { return next(err); }
    return res.redirect('/');
  })
});

router.get("/profile", (req, res, next) => {
  res.render("profile");
})

router.get("/first-profile-step", (req, res, next) => {
  res.render("first-profile-step");
})

router.get("/logout", (req, res) => {
  req.logout();
  res.redirect("/");
});

module.exports = router;
