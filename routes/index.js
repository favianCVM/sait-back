const {Router} = require('express')
const app = Router()

const users = require('./users')
const devices = require('./devices')

app.use('/users', users)
app.use('/devices', devices)

module.exports = app