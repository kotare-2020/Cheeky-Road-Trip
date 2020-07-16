import { ADD_NEW_TRIP, ADD_WAYPOINT } from '../actions/currentTrip'

const initialState = []


/*{
  tripName: '',
  startPoint: [-38.992391, 174.395546],
  //hard coded for testing purposes, this needs to be changed
  endPoint: [-39.099695, 174.074156]
}
*/
const reducer = (state = initialState, action) => {
  switch (action.type) {
    // case ADD_NEW_TRIP:
    //   return {
    //     tripName: action.tripName,
    //     startPoint: action.startPoint,
    //     endPoint: action.endPoint,
    //   }
      case ADD_WAYPOINT:
        return [...state,{
          lat: action.lat,
          long: action.long,
          streetName: action.streetName,
          buildingName: action.buildingName,
          label: action.label,
        }]
    default:
      return state
  }
}


export default reducer