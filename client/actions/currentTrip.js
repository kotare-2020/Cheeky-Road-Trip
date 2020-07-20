export const ADD_INSTRUCTIONS = "ADD_INSTRUCTIONS"
export const CONFIRM_ADDRESS = "CONFIRM_ADDRESS"
export const ADD_TRIP_NAME = "ADD_TRIP_NAME"
export const ERASE_TRIP = "ERASE_TRIP"

export function addTripInstructions(instructions) {
    return {
        type: ADD_INSTRUCTIONS,
        instructions: instructions,
    }
}

export function confirmAddress (addressInfo, waypointName) {
    return {
        type: CONFIRM_ADDRESS,
        addressInfo: addressInfo,
        waypointName: waypointName
    }
}

export function addTripName (tripName) {
    return {
        type: ADD_TRIP_NAME,
        tripName: tripName,
    }
}

export function eraseTrip() {
    return {
        type: ERASE_TRIP
    }
}