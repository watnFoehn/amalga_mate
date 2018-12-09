const express = require("express")
const uploadCloud = require('../configs/cloudinary')
const User = require("../models/User")

const router = express.Router()

router.post('/users/pictures', uploadCloud.single('picture'), (req, res, next) => {
  console.log('DEBUG')
  User.findByIdAndUpdate(req.user._id, { pictureUrl: req.file.url })
    .then(() => {
      res.json({
        success: true,
        pictureUrl: req.file.url
      })
    })
    .catch (error => {
    return  next(err)
    }) 
});

router.get('/users/:id', (req, res, next) => {
  User.findById(req.params.id)
    .then((user) => {
      res.json({
       user
      })
    })
    .catch (error => {
    return  next(err)
    }) 
});

module.exports = router;