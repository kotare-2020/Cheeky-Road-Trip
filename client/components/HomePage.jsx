import React from 'react'
import { connect } from 'react-redux'
import request from 'superagent'
import { setWaypoints } from '../actions/currentTrip'


class HomePage extends React.Component {

  state = {
    tripName: '',
    startPoint: '',
    stopOver: '',
    destination: '',
    waypointsForDispatch: {},
  }
  /*
  componentDidMount() {
  request.get("http://api.positionstack.com/v1/forward", {
  'access_key': process.env.POSITION_STACK_API_KEY,
  //process.env.POSITION_STACK_API_KEY,
  "country": "NZ",
  '& query': "87 Rugby Street, Palmerston North,",// address part or varialbe goes here
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
    this.setState({ waypointsForDispatch : { // put empty version of this in State?
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
    }})
    // this.props.dispatch(setWaypoints(waypointsForDispatch))
  })
  }*/

  handleChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value
    })
  }

  handleSubmit = (event) => {
    event.preventDefault()
    this.props.dispatch(setWaypoints(this.state.waypointsForDispatch))
    this.props.showHome(false)
  }

  // make handleClick

  confirmWaypoint = (event) => {

  }

  searchStart = (event) => {
    event.preventDefault()
    request.get("http://api.positionstack.com/v1/forward", {
    'access_key': process.env.POSITION_STACK_API_KEY,
    "country": "NZ",
    '& query': this.state.startPoint,
    }).then(res => {
      alert(res.body.data[0].label)
    })
  }

  // searchAddress = (event, waypoint) => {
  //   console.log("wp", waypoint)
  //   console.log("event", event)
  // }

  // searchAddress = (event, waypoint) => {
  //   console.log("wp", waypoint)
  //   console.log("event", event)
  // }

  render() {
    return (
      <>
        <div className="background-div" >
          <div className='landing-page-content-div'>
            <h1 className='landing-page-title'>Cheeky Road Trip </h1>
            <h3 className='landing-page-subtitle' >Tell us where you're going!</h3>
            <form onSubmit={this.handleSubmit}>

              <label id="display-block">
                Trip Name:
                <input onChange={this.handleChange} type="text" name="tripName" />
              </label>

              <label id="display-block">
                Start-Point:
                <input onChange={this.handleChange} type="text" name="startPoint" />
                <button onClick={this.searchStart}>Search</button>
                <button onClick={this.confirmWaypoint}>Confirm</button>
              </label>

              <label id="display-block">
                Stop-Over:
                <input onChange={this.handleChange} type="text" name="stopOver" />
                <button onClick={this.searchStop}>Search</button>
                <button>Confirm</button>
              </label>



              <label id="display-block">
                Destination:
                <input onChange={this.handleChange} type="text" name="destination" />
                <button onClick={this.searchDestination}>Search</button>
                <button>Confirm</button>
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