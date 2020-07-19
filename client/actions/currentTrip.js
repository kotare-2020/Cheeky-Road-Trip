export const ADD_TRIP = "ADD_TRIP"
export const ADD_INSTRUCTIONS = "ADD_INSTRUCTIONS"
export const CONFIRM_WAYPOINT = "CONFIRM_WAYPOINT"



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
}

export function confirmAddress (addressInfo) {
    return {
        type: CONFIRM_WAYPOINT,
        addressInfo: addressInfo
    }
}
