import {combineReducers} from 'redux'

import auth from './auth'
import foundPets from './foundPets'

export default combineReducers({
  auth,
  foundPets
})
