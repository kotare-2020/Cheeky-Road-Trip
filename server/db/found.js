const connection = require('./connection')

module.exports ={
  saveFound,
  getFoundAnimals 
}


function getFoundAnimals(db = connection) {
  return db('found').select()
}

  function saveFound (newFound , db = connection) {
    return db ('found')
    .insert ({
        species: newFound.species,
        photo: newFound.species,
        user_id: newFound.user_id
    })
}


