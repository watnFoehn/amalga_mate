const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
  username: {
    type: String,
    unique: true,
  },
  password: String,
  status: {
    type: String,
    enum: ['Pending Confirmation', 'Active'], default: 'Pending Confirmation'
  },
  email: {
    type: String,
    unique: true,
    match: /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i,
  }, String,
  secret: String,

  imgName: String,
  imgPath: { type: String, default: "http://www.independentmediators.co.uk/wp-content/uploads/2016/02/placeholder-image.jpg" },
  learnGroup: String,
  languages: String,
  location: String,
  getInTouch: String,
  music: String,
  sports: String,
  culinary: String,

}, {
    timestamps: {
      createdAt: 'created_at',
      updatedAt: 'updated_at'
    }
  });

const User = mongoose.model('User', userSchema);
module.exports = User;
