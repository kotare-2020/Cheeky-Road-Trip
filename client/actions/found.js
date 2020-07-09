import { getFoundApi } from '../apis/foundPets'

export function foundAnimals(animals) {
    return {
      type: 'GET_ANIMALS',
      animals: animals
  
    }
  }
  
  export function fetchAnimals() {
    return dispatch => {
      getFoundApi().then((animals) => {
        dispatch(foundAnimals(animals))
      })
    }
  }