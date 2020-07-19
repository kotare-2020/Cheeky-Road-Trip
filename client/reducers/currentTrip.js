import { ADD_TRIP, ADD_INSTRUCTIONS } from '../actions/currentTrip'


const initialState = {
  tripName: '',
  startWaypoint: {},
  inbetweenWaypoints: [],
  endWaypoint: {},
  tripInstructions: [],
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
    default:
      return state
  }
}


export default reducer