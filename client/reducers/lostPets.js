
const initialState = []

const reducer = (state = initialState, action) => {
  switch (action,type) {
    case 'GET_LOSTPETS':
      return action.lostPets

    default:
      return state
  }
}

export default reducer