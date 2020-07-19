import { ADD_NEW_TRIP, ADD_WAYPOINTS, SHOW_MAP } from '../actions/currentTrip'


const initialState = {
  tripName: '',
  startPoint: [],
  //hard coded for testing purposes, this needs to be changed
  endPoint: [],
  waypoints: {
    startWaypoint: {},
    inbetweenWaypoints: [],
    endWaypoint: {},
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
    case ADD_WAYPOINTS:
      return {...state,
        waypoints: {
          startWaypoint: action.startWaypoint,
          inbetweenWaypoints: action.inbetweenWaypoints,
          endWaypoint: action.endWaypoint,
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