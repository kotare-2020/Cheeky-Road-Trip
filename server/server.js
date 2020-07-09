const express = require('express')

const authRoutes = require('./routes/auth')
const lostRoutes = require('./routes/lost')
const foundRoutes = require('./routes/found')

const server = express()

server.use(express.json())
server.use(express.static('public'))

server.use('/api/auth', authRoutes)
server.use('/api/lost', lostRoutes)
server.use('/api/found', foundRoutes)

module.exports = server
