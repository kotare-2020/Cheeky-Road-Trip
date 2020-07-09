// read readme bro
// RECEIVE_LOST_PETS action
// and 
// ADD_LOST_PET actions go in here

export const ADD_LOST_PET = "ADD_LOST_PET"
export const GET_LOST_PETS = "GET_LOST_PETS"

import { getLost } from '../apis/lost'

export function addLostPet (lost) {
    return {
        type: ADD_LOST_PET,
        lost: lost
    }
}

export const getLostPets = (lostPetsArray) => {
  //returns an object from all the way via the API, the routes, the db, back to here
  //console.log(lostPetsArray)
  return {
    type: GET_LOST_PETS,
    lostPets: lostPetsArray
  }
}

export function fetchLostPets() {
  return (dispatch) => {
    getLost()
    .then(lostPets => {
      dispatch(getLostPets(lostPets))
      console.log(lostPets)
    })
  }
}