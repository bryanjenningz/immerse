var express = require('express')
var fs = require('fs')
var bodyParser = require('body-parser')

var app = express()
var users = JSON.parse(fs.readFileSync('MOCK_DATA.json').toString()).slice(0, 3)
var nextUserId = users.length + 1
var port = process.env.PORT || 3000

var usersCtrl = {
  getUsers,
  newUser,
  getUser,
  updateUser,
  deleteUser
}

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: false}))

app.get('/api/users', usersCtrl.getUsers)
app.post('/api/users', usersCtrl.newUser)
app.get('/api/users/:userId', usersCtrl.getUser)
app.put('/api/users/:userId', usersCtrl.updateUser)
app.delete('/api/users/:userId', usersCtrl.deleteUser)

app.listen(port, () => console.log(`listening on port ${port}`))

function sendJSON(res, status, json) {
  res.status(status)
  res.json(json)
}

function getUsers(req, res) {
  sendJSON(res, 200, users)
}

function newUser(req, res) {
  var {name, email, password, speaks, learning} = req.body
  if (!name || !email || !password || !speaks || !learning) {
    sendJSON(res, 400, {message: 'Please fill in all fields.'})
  } else {
    users.push({name, speaks, learning, _id: nextUserId++})
    sendJSON(res, 201, users)
  }
}

function getUser(req, res) {
  var {userId} = req.params
  userId = Number(userId)
  if (isNaN(userId)) {
    sendJSON(res, 400, {message: 'Put in a valid number for the user ID.'})
  } else {
    var user = getUserById(userId)
    if (!user) {
      sendJSON(res, 404, {message: 'User not found.'})
    } else {
      sendJSON(res, 200, user)
    }
  }
}

function updateUser(req, res) {
  var {userId} = req.params
  var {name, email, password, speaks, learning} = req.body
  userId = Number(userId)
  if (isNaN(userId)) {
    sendJSON(res, 400, {message: 'Put in a valid number for the user ID.'})
  } else {
    var user = getUserById(userId)
    if (!user) {
      sendJSON(res, 404, {message: 'User not found.'})
    } else {
      user.name = name || user.name
      user.email = email || user.email
      user.password = password || user.password
      user.speaks = speaks || user.speaks
      user.learning = learning || user.learning
      console.log(user)
      sendJSON(res, 200, Object.assign({}, user))
    }
  }
}

function deleteUser(req, res) {
  var {userId} = req.params
  userId = Number(userId)
  if (isNaN(userId)) {
    sendJSON(res, 400, {message: 'Put in a valid number for the user ID.'})
  } else {
    var user = getUserById(userId, removeUser)
    if (!user) {
      sendJSON(res, 404, {message: 'User not found.'})
    } else {
      sendJSON(res, 204, {})
    }
  }

  function removeUser(user, i, users) {
    users.splice(i, 1)
  }
}

function getUserById(id, cb) {
  return users.filter((user, i, users) => {
    if (user._id === id && cb) cb(user, i, users)
    return user._id === id
  })[0]
}
