const mongoose = require('mongoose')
const jwt = require('jsonwebtoken')
const crypto = require('crypto')

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    min: 32,
    trim: true,
    require: true
  },
  email: {
    type: String,
    require: true, 
    trim: true,
    lowercase: true,
    unique: true,
  },
  Hashed_password: {
    require: true,
    type: String,
  },
  about: String,
  username: String,
  profileImage:{
    type:String,
    default: ''
  },
  profileImages:{
    type:String,
    default: ''
  },
  salt: String,
  role: {
    type: Number,
    default: 0
  },
  resetPasswordLink: {
    data: String,
    default: ''
  }
}, {timestamp: true})

userSchema
  .virtual('password')
  .set(function(password) {
    // create a temporary variable _password
    this._password = password,
    // generate salt
    this.salt = this.makeSalt()
    // encrypt password
    this.Hashed_password = this.encryptPassword(password)
  })
  .get(function() {
    return this._password
  })

userSchema.methods = {
  authenticate: function (plainText) {
    // encrypt and compare with hashed password from the database
    return this.encryptPassword(plainText) === this.Hashed_password;
  },
  encryptPassword: function(password) {
    if (!password) return '';
    try {
      return crypto
              .createHmac('sha1', this.salt)
              .update(password)
              .digest('hex')
    } catch (err) {
      return '';
    }
  },
  makeSalt: function() {
    return Math.round(new Date().valueOf() * Math.random()) + '';
  },
  generateAuthToken: function() {
    return jwt.sign({_id: this._id}, process.env.JWT_SECRET)
  }
}

module.exports = mongoose.model('User', userSchema)
