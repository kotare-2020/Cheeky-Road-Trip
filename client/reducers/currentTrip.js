import { ADD_NEW_TRIP, ADD_WAYPOINT, SHOW_MAP } from '../actions/currentTrip'


const initialState = {
  tripName: '',
  startPoint: [-38.992391, 174.395546],
  //hard coded for testing purposes, this needs to be changed
  endPoint: [-39.099695, 174.074156],
  waypoint: {
    latitude: 0,
    longitude: 0,
    streetName: "",
    buildingName: "",
    label: "",
  },
  haveWaypoints: false
}

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_NEW_TRIP:
      return {...state,
        tripName: action.tripName,
        startPoint: action.startPoint,
        endPoint: action.endPoint,
      }
    case ADD_WAYPOINT:
      return {...state,
        waypoint: {
          latitude: action.lat,
          longitude: action.long,
          streetName: action.streetName,
          buildingName: action.buildingName,
          label: action.label,
        }
      }
    case SHOW_MAP:
      return {...state,
        haveWaypoints: action.boolean,
      }
    default:
      return state
  }
}


export default reducer