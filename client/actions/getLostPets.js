export const getLostPets = (lostPetsArray) => {
  //returns an object from all the way via the API, the routes, the db, back to here
  return {
    type: GET_LOSTPETS,
    lostPets: lostPetsArray
  }
}