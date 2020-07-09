import {combineReducers} from 'redux'

import auth from './auth'
import lostPets from './lostPets'

export default combineReducers({
  auth,
  lostPets
})
