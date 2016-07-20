var mongoose = require('mongoose')

var userSchema = new mongoose.Schema({
  name: {type: String, required: true},
  email: {type: String, required: true},
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

mongoose.model('User', userSchema)
