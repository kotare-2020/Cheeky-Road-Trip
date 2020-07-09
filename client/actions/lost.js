// read readme bro
// RECEIVE_LOST_PETS action
// and 
// ADD_LOST_PET actions go in here

export const ADD_LOST_PET = "ADD_LOST_PET"

export function addLostPet (lost) {
    return {
        type: ADD_LOST_PET,
        lost: lost
    }
}

export const getLostPets = (lostPetsArray) => {
  //returns an object from all the way via the API, the routes, the db, back to here
  return {
    type: GET_LOST_PETS,
    lostPets: lostPetsArray
  }
}