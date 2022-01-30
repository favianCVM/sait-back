const {Router} = require('express')
const app = Router()

const users = require('./users')
const devices = require('./devices')
const items = require('./items')
const technicians = require('./technicians')
const incidences = require('./incidences')

app.use('/users', users)
app.use('/devices', devices)
app.use('/items', items)
app.use('/technicians', technicians)
app.use('/incidences', incidences)

module.exports = app