import { SEARCH_ADDRESS } from '../actions/waypointConfirmation'


const initialState = {
  waypointsArray: [],
}

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case SEARCH_ADDRESS:
      return { waypointsArray: action.addressArray }
    default:
      return state
  }
}


export default reducer