import request from 'superagent'

const foundPetsUrl = '/api/found/'
const lostPetsUrl = '/api/lost/'

export function getFound () {
    return request
     .get(foundPetsUrl)
     .then(response => response.body)
  }






