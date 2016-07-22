var jwt = require('jsonwebtoken')
var bcrypt = require('bcryptjs')

module.exports = {
  isCorrectPassword,
  hashPassword,
  generateJwt
}

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
