import { ADD_LOST_PET, GET_LOST_PETS } from '../actions/lost'

const initialState = []

const reducer = (state = initialState, action) => {
  switch (action,type) {
    case GET_LOST_PETS:
      return action.lostPets

    default:
      return state
  }
}

export default reducer



export const tasks = (state = initialState, action) => {
    switch (action.type) {
        case ADD_LOST_PET:
            return action.lost
        default:
            return state
    }
}
