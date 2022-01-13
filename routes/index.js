const {Router} = require('express')
const app = Router()

const users = require('./users')
const devices = require('./devices')
const components = require('./components')
const technicians = require('./technicians')
const incidences = require('./incidences')

app.use('/users', users)
app.use('/devices', devices)
app.use('/components', components)
app.use('/technicians', technicians)
app.use('/incidences', incidences)

module.exports = app