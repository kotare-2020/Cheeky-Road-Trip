import { combineReducers } from 'redux'

import currentTrip from './currentTrip'
import waypointConfirmation from './waypointConfirmation'

export default combineReducers({
  currentTrip,
  waypointConfirmation
})
