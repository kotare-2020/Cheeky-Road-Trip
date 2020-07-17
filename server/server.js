const express = require('express')
const path = require('path')
require('dotenv').config({ path: path.resolve(__dirname, '../.env') })// comment both these later

const authRoutes = require('./routes/auth')

const server = express()

server.use(express.json())
server.use(express.static('public'))

server.use('/api/auth', authRoutes)

module.exports = server
