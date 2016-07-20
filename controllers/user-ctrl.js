var mongoose = require('mongoose')
var User = mongoose.model('User')

// var fs = require('fs')
// var users = JSON.parse(fs.readFileSync(__dirname + '/../MOCK_DATA.json').toString())
// var nextUserId = users.length + 1

var userCtrl = {
  getUsers,
  newUser,
  getUser,
  updateUser,
  deleteUser
}

module.exports = userCtrl

function sendJSON(res, status, json) {
  res.status(status)
  res.json(json)
}

function getUsers(req, res) {
  User
  .find({})
  .exec(function(err, users) {
    if (err) {
      sendJSON(res, 404, {message: err})
    } else {
      if (!users) {
        sendJSON(res, 404, {message: 'There are no users returned.'})
      } else {
        sendJSON(res, 200, users)
      }
    }
  })
}

function newUser(req, res) {
  var {name, email, password, speaks, learning} = req.body

  if (!name || !email || !password || !speaks || !learning) {
    sendJSON(res, 400, {message: 'Please fill in all fields.'})
  } else {
    User
    .create({name, email, password, speaks, learning}, function(err, user) {
      if (err) {
        sendJSON(res, 404, {message: err})
      } else {
        if (!user) {
          sendJSON(res, 404, {message: 'No user with that ID.'})
        } else {
          sendJSON(res, 201, user)
        }
      }
    })
  }
}

function getUser(req, res) {
  var {userId} = req.params
  if (!isValidUserId(userId)) {
    sendJSON(res, 400, {message: 'Put in a valid user ID (a hexadecimal number).'})
  } else {
    User
    .findById(userId)
    .exec(function(err, user) {
      if (err) {
        sendJSON(res, 404, {message: err})
      } else if (!user) {
        sendJSON(res, 404, {message: 'User not found.'})
      } else {
        sendJSON(res, 200, user)
      }
    })
  }
}

function updateUser(req, res) {
  var {userId} = req.params
  var {name, email, password, speaks, learning} = req.body
  if (!isValidUserId(userId)) {
    sendJSON(res, 400, {message: 'Put in a valid user ID (a hexadecimal number).'})
  } else {
    User
    .findById(userId)
    .exec(function(err, user) {
      if (err) {
        sendJSON(res, 404, {message: err})
      } else if (!user) {
        sendJSON(res, 404, {message: 'User not found.'})
      } else {
        user.name = name || user.name
        user.email = email || user.email
        user.password = password || user.password
        user.speaks = speaks || user.speaks
        user.learning = learning || user.learning
        user.save(function(err, user) {
          if (err) {
            sendJSON(res, 404, {message: err})
          } else {
            sendJSON(res, 200, user)
          }
        })
      }
    })
  }
}

function deleteUser(req, res) {
  var {userId} = req.params
  if (!isValidUserId(userId)) {
    sendJSON(res, 400, {message: 'Put in a valid user ID (a hexadecimal number).'})
  } else {
    User
    .findByIdAndRemove(userId)
    .exec(function(err, user) {
      if (err) {
        sendJSON(res, 404, {message: err})
      } else {
        sendJSON(res, 204, {})
      }
    })
  }
}

function isValidUserId(id) {
  return /^[0-9a-f]+$/.test(id)
}
