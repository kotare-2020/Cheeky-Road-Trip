if(!process.env.NODE_ENV || process.env.NODE_ENV == 'development') {
  require('dotenv').config()
}

const server = require('./server')
const PORT = process.env.PORT || 4040

server.listen(PORT, function () {
  console.log('Listening on port', PORT)
})
