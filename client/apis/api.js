import request from 'superagent'

const foundPetsUrl= 'http://localhost:3000/api/v1/found/'

export function getFound () {
    return request
     .get(foundPetsUrl)
     .then(response => response.body)
  }






