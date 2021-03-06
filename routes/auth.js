const express = require("express");
const passport = require('passport');
const router = express.Router();
const User = require("../models/User");
const nodemailer = require('nodemailer');
const uploadCloud = require('../config/cloudinary.js');


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

router.post("/login", passport.authenticate("local",
  {
    successRedirect: "main-page",
    failureRedirect: "/check-email",
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

    function generateSecret() {
      let text = "";
      let possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

      for (let i = 0; i < 8; i++)
        text += possible.charAt(Math.floor(Math.random() * possible.length));

      return text;
    }
    const salt = bcrypt.genSaltSync(bcryptSalt);
    const hashPass = bcrypt.hashSync(password, salt);
    const secret = generateSecret();

    const newUser = new User({
      username,
      password: hashPass,
      email,
      secret
    });

    newUser.save()
      .then(() => {
        res.redirect("/check-email");
      })
      .then(() => {
        transporter.sendMail({
          from: '"AMALGAMATE" <ironhack.amalgamate@gmail.com>',
          to: email,
          subject: 'Activate AMALGAMATE',
          text: 'Awesome Message',
          html: `Welcome to Amalgamate!
        In order to get started, just  the link and follow the instructions.
        <a href='${process.env.BASE_URL}/auth/validate?secret=${secret}'>Follow me!</a>`
        })
      })

      .catch(err => {
        res.render("auth/signup", { message: "Something went wrong" });
      })
  });
});

router.get("/validate", (req, res, next) => {
  User.findOne({ secret: req.query.secret })
    .then((user) => {
      req.login(user, loginError => {
        req.flash('You are now logged in!');
        res.redirect("/firststep");
      });
    })
    .catch(err => {
      console.log(err)
    })
})

router.get("/main-page", (req, res, next) => {
  User.findOne({ _id: req.user._id })
    .then(data => {
      res.render("auth/main-page", { data });
    })
    .catch(err => {
      console.log(err)
    })
});

router.get("/profile", (req, res, next) => {
  User.findOne({ _id: req.user._id })
    .then(data => {
      res.render("my-profile", { data });
    })
    .catch(err => {
      console.log(err)
    })
});

router.get("/profile/:username", (req, res, next) => {
  User.findOne({ username: req.params.username })
    .then(data => {
      res.render("profile", { data, isConnectedUser: req.user && req.user._id.equals(data._id) });
    })
    .catch(err => {
      console.log(err)
    })
});

router.get("/firststep", (req, res, next) => {
  res.render("firststep");
})

router.get("/filtered-page", (req, res, next) => {
  let query = req.query.q
  User.find({ [query]: { $ne: null } })
    .then(data => {
      res.render("filtered-page", { data });
    })
    .catch(error => {
      console.log(error)
    })
})

router.get("/logout", (req, res, next) => {
  req.logout();
  res.redirect("/");
});

router.post('/firststep', uploadCloud.single('photo'), (req, res) => {
  let sports = req.body.sports;
  let music = req.body.music;
  let learnGroup = req.body.learnGroup;
  let languages = req.body.languages;
  let culinary = req.body.culinary;
  let getInTouch = req.body.getInTouch;

  let update = {
    sports: sports,
    music: music,
    learnGroup: learnGroup,
    languages: languages,
    culinary: culinary,
    getInTouch: getInTouch,
    status: 'Active'
  }

  if (req.file) {
    update.imgPath = req.file.url
    update.imgName = req.file.originalname
  }

  User.findByIdAndUpdate(req.user._id, update,
    function (err) {
      if (err) {
        console.log(err);
      }
    });
  res.redirect('../auth/main-page')
})


router.get('/edit-profile', (req, res, next) => {
  User.findById(req.user.id)
    .then(user => {
      res.render('edit-profile', { user })
    })
});


router.post('/edit-profile', uploadCloud.single('photo'), (req, res, next) => {
  
  let learnGroup = req.body.learnGroup
  let languages = req.body.languages
  let getInTouch = req.body.getInTouch
  let music = req.body.music
  let sports = req.body.sports
  let culinary = req.body.culinary

  let update = {
    learnGroup: learnGroup,
    languages: languages,
    getInTouch: getInTouch,
    music: music,
    sports: sports,
    culinary: culinary
  }

  if (req.file) {
    update.imgPath = req.file.url
    update.imgName = req.file.originalname
  }
  User.findByIdAndUpdate(req.user._id, update)
    .then(user => {
      res.redirect('/auth/profile/' + user.username)
    })
    .catch(err => {
      console.log('There was an error', err)
    })
});

router.get('/delete-profile/:username/delete', (req, res, next) => {
  User.findOneAndRemove({ username: req.params.username })
    .then(user => {
      res.redirect('/')
    })
    .catch(err => {
      console.log('Error', err)
    })
})

module.exports = router;
