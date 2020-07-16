export const ADD_NEW_TRIP = "ADD_NEW_TRIP"
export const ADD_WAYPOINT = "ADD_WAYPOINT"


export function addNewTrip(tripData) {
    return {
        type: ADD_NEW_TRIP,
        tripName: tripData.tripName,
        startPoint: tripData.startPoint,
        endPoint: tripData.endPoint,
    }
}


export function setWaypoints(withDataFromAPI) {
  return {
      type: ADD_WAYPOINT,
      lat: withDataFromAPI.latitude,
      long: withDataFromAPI.longitude,
      streetName: withDataFromAPI.street,
      buildingName: withDataFromAPI.name,
      label: withDataFromAPI.label,
  }
}

//haveWaypoints