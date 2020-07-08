import request from 'superagent'

const lostUrl = '/api/lost/'
const foundUrl = '/api/found/'

export function saveLost () {
    return request
        .post(lostUrl)
        .send(lost)
        .then(req => {
            return req.body
        })
}

export function saveFoundApi (found) {
    return request
        .post(foundUrl)
        .send(found)
        .then(req => {
            return req.body
        })
}