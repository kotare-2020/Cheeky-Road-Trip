export const ADD_NEW_TRIP = "ADD_NEW_TRIP"


export function addNewTrip(tripData) {
    return {
        type: ADD_NEW_TRIP,
        tripName: tripData.tripName,
        startPoint: tripData.startPoint,
        endPoint: tripData.endPoint,
    }
}


// export function fetchLostPets() {
//   return (dispatch) => {
//     getLost()
//     .then(lostPets => {
//       dispatch(getLostPets(lostPets))
//       console.log(lostPets)
//     })
//   }
// }