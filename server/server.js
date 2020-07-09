const express = require('express')

const authRoutes = require('./routes/auth')
const foundRoutes = require('./routes/found')
const lostRoutes = require('./routes/lost')


const server = express()

server.use(express.json())
server.use(express.static('public'))

server.use('/api', authRoutes)
server.use('/api/found', foundRoutes)
server.use('/api/lost', lostRoutes)

module.exports = server
