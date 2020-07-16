import React from 'react'
import { connect } from 'react-redux'
import request from 'superagent'
import { setWaypoints } from '../actions/currentTrip'


class HomePage extends React.Component {

  state = {
    from: '',
    to: ''
  }

  componentDidMount() {
    console.log("env", process.env.POSITION_STACK_API_KEY)// please fix
request.get("http://api.positionstack.com/v1/forward", {
  'access_key': '',// key go here as string
  //process.env.POSITION_STACK_API_KEY "how the fuck do i make work" (Richard, 2020)
  "country": "NZ",
  '& query': "87 Rugby Street, Palmerston North,",// address part goes here
})
  .then(res => {
    // Can't push to an array WHILE setting to a variable otherwise .push() will return array length.
    this.props.currentTrip.waypoints.inbetweenWaypoints.push({
      buildingName: res.body.data[0].name,
      label: res.body.data[0].label,
      latitude: res.body.data[0].latitude,
      longitude: res.body.data[0].longitude,
      streetName: res.body.data[0].street,
    })
    const waypoints = {
      startWaypoint: {
        buildingName: res.body.data[0].name,
        label: res.body.data[0].label,
        latitude: res.body.data[0].latitude,
        longitude: res.body.data[0].longitude,
        streetName: res.body.data[0].street,
      },
      inbetweenWaypoints: this.props.currentTrip.waypoints.inbetweenWaypoints,
      endWaypoint: {
        buildingName: res.body.data[0].name,
        label: res.body.data[0].label,
        latitude: res.body.data[0].latitude,
        longitude: res.body.data[0].longitude,
        streetName: res.body.data[0].street,
      },
    }
    this.props.dispatch(setWaypoints(waypoints))
  })
  }

  handleChange = (event) => {
    console.log('form is changing!')
  }

  handleSubmit = (event) => {
    event.preventDefault()
    this.props.showHome(false)
  }

  render() {
    return (
      <>
        <div className="background-div" >
          <div className='landing-page-content-div'>
            <h1 className='landing-page-title'>Cheeky Road Trip </h1>
            <h3 className='landing-page-subtitle' >Tell us where you're going!</h3>
            <form onSubmit={this.handleSubmit}>
              <label id="display-block">
                From:
                <input onChange={this.handleChange} type="text" name="from" />
              </label>

              <label id="display-block">
                To:
                <input onChange={this.handleChange} type="text" name="to" />
              </label>
              <input id="display-block" type="submit" value="Let's go!" />
            </form>
          </div>
        </div>
      </>

    )
  }
}
const mapStateToProps = ({ currentTrip }) => {
  return {
    currentTrip
  }
}

export default connect(mapStateToProps)(HomePage)


/*
console.log("env", process.env.POSITION_STACK_API_KEY)// please fix
request.get("http://api.positionstack.com/v1/forward", {
  'access_key': '',// key go here as string
  //process.env.POSITION_STACK_API_KEY "how the fuck do i make work" (Richard, 2020)
  "country": "NZ",
  '& query': "87 Rugby Street, Palmerston North,",// address part goes here
})
  .then(res => {
    // Can't push to an array WHILE setting to a variable otherwise .push() will return array length.
    this.props.currentTrip.waypoints.inbetweenWaypoints.push({
      buildingName: res.body.data[0].name,
      label: res.body.data[0].label,
      latitude: res.body.data[0].latitude,
      longitude: res.body.data[0].longitude,
      streetName: res.body.data[0].street,
    })
    const waypoints = {
      startWaypoint: {
        buildingName: res.body.data[0].name,
        label: res.body.data[0].label,
        latitude: res.body.data[0].latitude,
        longitude: res.body.data[0].longitude,
        streetName: res.body.data[0].street,
      },
      inbetweenWaypoints: this.props.currentTrip.waypoints.inbetweenWaypoints,
      endWaypoint: {
        buildingName: res.body.data[0].name,
        label: res.body.data[0].label,
        latitude: res.body.data[0].latitude,
        longitude: res.body.data[0].longitude,
        streetName: res.body.data[0].street,
      },
    }
    this.props.dispatch(setWaypoints(waypoints))
  })
  */