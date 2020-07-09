import request from 'superagent'

const foundUrl = '/api/found/'

export function getFoundApi() {
    return request
      .get(foundUrl)
      .then(response => response.body)
  }
  