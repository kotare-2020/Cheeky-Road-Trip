import { ADD_INSTRUCTIONS, CONFIRM_ADDRESS, ADD_TRIP_NAME, ERASE_TRIP } from '../actions/currentTrip'


const initialState = {
  tripName: '',
  START: {},
  MID: [],
  END: {},
  tripInstructions: [],
  confirmedWaypoint: {}
}

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_INSTRUCTIONS:
      return {
        ...state,
        tripInstructions: action.instructions
      }
    case CONFIRM_ADDRESS:
      if (action.waypointName == "MID") {
        state.MID.push(action.addressInfo)
        return {
          ...state,
          [action.waypointName]: state.MID
        }
      } else {
        return {
          ...state,
          [action.waypointName]: action.addressInfo,
        }
      }
    case ADD_TRIP_NAME:
      return {
        ...state,
        tripName: action.tripName
      }
    case ERASE_TRIP:
      return {
        tripName: '',
        START: {},
        MID: [],
        END: {},
        tripInstructions: [],
        confirmedWaypoint: {}
      }
    default:
      return state
  }
}


export default reducer