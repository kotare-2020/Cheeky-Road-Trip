import { ADD_TRIP, ADD_INSTRUCTIONS, CONFIRM_WAYPOINT  } from '../actions/currentTrip'


const initialState = {
  tripName: '',
  startWaypoint: {},
  inbetweenWaypoints: [],
  endWaypoint: {},
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
      case CONFIRM_WAYPOINT:
      return {...state,
        confirmedWaypoint: action.boolean,
      }
    default:
      return state
  }
}


export default reducer