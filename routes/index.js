const {Router} = require('express')
const app = Router()

const users = require('./users')


app.use('/users', users)

module.exports = app