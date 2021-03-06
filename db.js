var mongoose = require('mongoose')

var dbURI = process.env.NODE_ENV === 'production' ?
            process.env.MONGOLAB_URI :
            'mongodb://localhost/immerse'

mongoose.connect(dbURI)

mongoose.connection.on('connected', () => console.log(`Mongoose connected to ${dbURI}`))
mongoose.connection.on('error', err => console.log(`Mongoose connection error: ${err}`))

require('./models/user')

function isCorrectPassword(password, hashedPassword) {
  return bcrypt.compareSync(password, hashedPassword)
}

function hashPassword(password) {
  var saltRounds = 5
  var salt = bcrypt.genSaltSync(saltRounds)
  var hashedPassword = bcrypt.hashSync(password, salt)
  return hashedPassword
}

function generateJwt(user) {
  var expiration = new Date()
  expiration.setDate(expiration.getDate() + 7)

  return jwt.sign({
    _id: user._id,
    name: user.name,
    email: user.email,
    expiration: parseInt(expiration.getTime() / 1000)
  }, process.env.JWT_SECRET)
}

