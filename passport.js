var passport = require('passport')
var LocalStrategy = require('passport-local').Strategy
var mongoose = require('mongoose')
var User = mongoose.model('User')

passport.use(new LocalStrategy({usernameField: 'email'},
function(username, password, done) {
  User.findOne({email: username}, function(err, user) {
    if (err) {
      return done(err)
    } else if (!user) {
      return done(null, false, {message: 'Incorrect username.'})
    } else if (user.isValidPassword(password)) {
      return done(null, false, {message: 'Incorrect password.'})
    } else {
      return done(null, user)
    }
  })
}))
