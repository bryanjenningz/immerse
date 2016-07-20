var express = require('express')
var bodyParser = require('body-parser')
require('./db')
require('./passport')
var userCtrl = require('./controllers/user-ctrl')

var app = express()
var port = process.env.PORT || 3000

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: false}))

app.get('/api/users', userCtrl.getUsers)
app.post('/api/users', userCtrl.newUser)
app.get('/api/users/:userId', userCtrl.getUser)
app.put('/api/users/:userId', userCtrl.updateUser)
app.delete('/api/users/:userId', userCtrl.deleteUser)

app.listen(port, () => console.log(`listening on port ${port}`))

