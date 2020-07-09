import request from 'superagent'

const foundPetsUrl = '/api/found/'
const lostPetsUrl = '/api/lost/'

export function getFound() {
    return request
        .get(foundPetsUrl)
        .then(response => response.body)
}

export function addLost(lost) {
    return request
        .post(lostPetsUrl)
        .send(lost)
        .then(req => {
            // console.log(req.body)
            return req.body
        })
}




