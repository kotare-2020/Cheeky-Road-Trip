import {combineReducers} from 'redux'

import auth from './auth'
import currentTrip from './currentTrip'
import waypointConfirmation from './waypointConfirmation'

export default combineReducers({
  auth,
  currentTrip,
  waypointConfirmation
})
