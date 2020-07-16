export const ADD_NEW_TRIP = "ADD_NEW_TRIP"
export const ADD_WAYPOINT = "ADD_WAYPOINT"
export const SHOW_MAP = "SHOW_MAP"


export function addNewTrip(tripData) {
    return {
        type: ADD_NEW_TRIP,
        tripName: tripData.tripName,
        startPoint: tripData.startPoint,
        endPoint: tripData.endPoint,
    }
}

export function setWaypoints(withObject) {
  return {
      type: ADD_WAYPOINT,
      startWaypoint: withObject.startWaypoint,
      inbetweenWaypoints: withObject.inbetweenWaypoints,
      endWaypoint: withObject.endWaypoint
  }
}

export function haveWaypoints(boolean) {
    return {
        type: SHOW_MAP,
        haveWaypoints: boolean
    }
}
