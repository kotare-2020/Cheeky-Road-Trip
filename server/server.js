const express = require('express')
const path = require('path')
require('dotenv').config({ path: path.resolve(__dirname, '../.env') })// comment both these later to test whether they're nes

const server = express()

server.use(express.json())
server.use(express.static('public'))


module.exports = server
