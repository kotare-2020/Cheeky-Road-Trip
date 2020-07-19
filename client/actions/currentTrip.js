<<<<<<< HEAD
export const ADD_NEW_TRIP = "ADD_NEW_TRIP"
export const ADD_WAYPOINTS = "ADD_WAYPOINTS"
export const SHOW_MAP = "SHOW_MAP"
export const CONFIRM_WAYPOINT = "CONFIRM_WAYPOINT"
||||||| merged common ancestors
export const ADD_NEW_TRIP = "ADD_NEW_TRIP"
export const ADD_WAYPOINTS = "ADD_WAYPOINTS"
export const SHOW_MAP = "SHOW_MAP"

=======
export const ADD_TRIP = "ADD_TRIP"
export const ADD_INSTRUCTIONS = "ADD_INSTRUCTIONS"

>>>>>>> 8353529aebff7eaddf6d0b5ec3b3b3bd9643aa3c


export function addNewTrip(tripData) {
  return {
      type: ADD_TRIP,
      tripName: tripData.tripName,
      startWaypoint: tripData.startWaypoint,
      inbetweenWaypoints: tripData.inbetweenWaypoints,
      endWaypoint: tripData.endWaypoint
  }
}

export function addTripInstructions(instructions) {
    return {
        type: ADD_INSTRUCTIONS,
        instructions: instructions,
    }
<<<<<<< HEAD
}

export function confirmAddress (addressInfo) {
    return {
        type: CONFIRM_WAYPOINT,
        addressInfo: addressInfo
    }
}
||||||| merged common ancestors
}
=======
}
>>>>>>> 8353529aebff7eaddf6d0b5ec3b3b3bd9643aa3c
