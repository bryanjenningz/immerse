var mongoose = require('mongoose')

var userSchema = new mongoose.Schema({
  name: {type: String, required: true},
  email: {type: String, required: true, unique: true},
  password: {type: String, required: true},
  words: [{type: String}],
  sentences: [{type: String}]
})

mongoose.model('User', userSchema)
