import request from 'superagent'

const lostUrl = '/api/lost/'

export function saveLost () {
    return request
        .post(lostUrl)
        .send(lost)
        .then(req => {
            return req.body
        })
}

