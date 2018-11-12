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

router.get("/login", (req, res, next) => {
  res.render("auth/login", { "message": req.flash("error") });
});

/* We need to make sure that this will only be true if the status is something like:
Never logged in before */
router.post("/login", passport.authenticate("local", {
<<<<<<< HEAD
  successRedirect: "firststep", //the standard was just "/"; so you will land on index page / if we don't succeed with status stuff, we might just want to redirect to first page or profile
=======
  successRedirect: "/",
>>>>>>> 6bcf40ad0a626ff3c4d13597fe91b40e5ea7d796
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
        html: `<a href='http://localhost:3000/'>click me</a>`
    })
  })
    
    .catch(err => {
      res.render("auth/signup", { message: "Something went wrong" });
    })
  });
});


router.get("/profile", (req, res, next) => {
  res.render("profile");
})

router.get("/firststep", (req, res, next) => {
  res.render("firststep");
})

router.get("/logout", (req, res, next) => {
  req.logout();
  res.redirect("/");
});


module.exports = router;
