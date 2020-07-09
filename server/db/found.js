const connection = require('./connection')

module.exports ={
  getFoundAnimals 
}


function getFoundAnimals(db = connection) {
  return db('found').select()
}


