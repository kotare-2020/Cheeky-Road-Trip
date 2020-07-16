import { ADD_NEW_TRIP } from '../actions/currentTrip'

const initialState = {
  tripName: '',
  startPoint: [-38.992391, 174.395546],
  //hard coded for testing purposes, this needs to be changed
  endPoint: [-39.099695, 174.074156]
}

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_NEW_TRIP:
      return {
        tripName: action.tripName,
        startPoint: action.startPoint,
        endPoint: action.endPoint,

      }
    default:
      return state
  }
}


export default reducer