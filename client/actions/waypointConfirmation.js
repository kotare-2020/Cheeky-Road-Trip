export const SEARCH_ADDRESS = "SEARCH_ADDRESS"


export function searchAddress (addressArray) {
    return {
        type: SEARCH_ADDRESS,
        addressArray: addressArray
    }
}