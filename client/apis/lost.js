import request from 'superagent'

const lostPetsUrl = '/api/lost/'

export function getLost () {
    return request
     .get(lostPetsUrl)
     .then(response => response.body)
  }






