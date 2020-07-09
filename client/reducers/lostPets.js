import { ADD_LOST_PET } from '../actions/lost'

const initialState = []

export const tasks = (state = initialState, action) => {
    switch (action.type) {
        case ADD_LOST_PET:
            return action.lost
        default:
            return state
    }
}