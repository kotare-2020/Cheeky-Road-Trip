import {combineReducers} from 'redux'

import auth from './auth'
import currentTrip from './currentTrip'

export default combineReducers({
  auth,
  currentTrip,
})
