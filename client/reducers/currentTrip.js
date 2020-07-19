import { ADD_TRIP, ADD_INSTRUCTIONS, CONFIRM_ADDRESS } from '../actions/currentTrip'


const initialState = {
  tripName: '',
  startWaypoint: {},
  inbetweenWaypoints: [],
  endWaypoint:  {},
  tripInstructions: [],
  confirmedWaypoint: {}
}

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_TRIP:
      return {
        ...state,
        tripName: action.tripName,
        startWaypoint: action.startWaypoint,
        inbetweenWaypoints: action.inbetweenWaypoints,
        endWaypoint: action.endWaypoint,
      }
    case ADD_INSTRUCTIONS:
      return {
        ...state,
        tripInstructions: action.instructions
      }
      case CONFIRM_ADDRESS:
      return {...state,
        [action.waypointName]: action.addressInfo,
      }
    default:
      return state
  }
}


export default reducer