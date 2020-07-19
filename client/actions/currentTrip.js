export const ADD_NEW_TRIP = "ADD_NEW_TRIP"
export const ADD_WAYPOINTS = "ADD_WAYPOINTS"
export const SHOW_MAP = "SHOW_MAP"
export const CONFIRM_WAYPOINT = "CONFIRM_WAYPOINT"

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
      type: ADD_WAYPOINTS,
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

export function confirmAddress (addressInfo) {
    return {
        type: CONFIRM_WAYPOINT,
        addressInfo: addressInfo
    }
}