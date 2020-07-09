import request from 'superagent'

const foundUrl = '/api/found/'

export function getFoundApi() {
    return request
      .get(foundUrl + "/found")
      .then(response => response.body)
  }
  

  export function saveFoundApi (found) {
    return request
        .post(foundUrl)
        .send(found)
        .then(req => {
            return req.body
        })
}