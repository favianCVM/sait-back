const {Router} = require('express')
const app = Router()

const users = require('./users')
const devices = require('./devices')
const components = require('./components')

app.use('/users', users)
app.use('/devices', devices)
app.use('/components', components)

module.exports = app