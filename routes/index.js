const {Router} = require('express')
const app = Router()

const profiles = require('./profiles')


app.use('/profile', profiles)

module.exports = app