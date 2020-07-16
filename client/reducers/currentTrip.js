import { ADD_NEW_TRIP, ADD_WAYPOINT } from '../actions/currentTrip'

const initialState = []


/*{
  tripName: '',
  startPoint: [0, 0],
  endPoint: [0, 0]
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

// {
//   type: 'ADD_NEW_TRIP',
//   tripName: 'The big ol trip',
//   startPoint: [175.599137604434901, -40.344236415121266],
//   endPoint: [175.615445959880446, -40.371374486782742]
// }


export default reducer