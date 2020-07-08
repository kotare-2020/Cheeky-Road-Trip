const express = require('express')

const authRoutes = require('./routes/auth')
const animalsRoutes = require('./routes/foundAnimals')

const server = express()

server.use(express.json())
server.use(express.static('public'))

server.use('/api/v1', authRoutes)
server.use('/api', animalsRoutes)

module.exports = server
