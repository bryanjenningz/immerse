var mongoose = require('mongoose')
var bcrypt = require('bcryptjs')
var saltRounds = 5

var userSchema = new mongoose.Schema({
  name: {type: String, required: true},
  email: {type: String, required: true, unique: true},
  password: {type: String, required: true},
  speaks: {type: String, required: true},
  learning: {type: String, required: true},
  isLoggedIn: {type: Boolean, 'default': true},
  lastLoggedIn: {type: Date, 'default': Date.now},
  age: {type: Number, min: 0, max: 120},
  gender: String,
  city: String,
  country: String,
  about: String
})

userSchema.methods.isValidPassword = isValidPassword
userSchema.methods.setPassword = setPassword

mongoose.model('User', userSchema)

function isValidPassword(password, salt) {
  var user = this
  return bcrypt.compareSync(password, user.hash)
}

function setPassword(password) {
  var user = this
  var salt = bcrypt.genSaltSync(saltRounds)
  var hash = bcrypt.hashSync(password, salt)

  // We don't need to store the salt because the salt is stored in the hash.
  user.hash = hash
}
