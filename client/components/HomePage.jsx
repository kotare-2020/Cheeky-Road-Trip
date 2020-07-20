import React from 'react'
import { connect } from 'react-redux'
import request from 'superagent'
import { addNewTrip } from '../actions/currentTrip'


//Component Imports
import AddressConfirm from './AddressConfirm'

// Actions imports
import { searchAddress } from '../actions/waypointConfirmation'


class HomePage extends React.Component {

  state = {
    tripName: '',
    startPoint: '',
    stopOver: '',
    destination: '',
    startWaypoint: {
      // default test values
      latitude: -36.8191,
      longitude: 174.7248
    },
    inbetweenWaypoints: [],
    endWaypoint: {
      // default test values
      latitude: -38.3723,
      longitude: 177.5581
    },
    START: false,
    END: false,
  }




  handleChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value
    })
  }

  hideAddressOptions = (waypointName) => {
    this.setState({
      [waypointName]: false
    })
  }

  handleSubmit = (event) => {
    event.preventDefault()
    this.props.showHome(false)
  }


// options = {
//   enableHighAccuracy: true,
//   timeout: 5000,
//   maximumAge: 0
// };

// success = (pos) => {
//   var crd = pos.coords;
//   console.log('Your current position: ');
//   console.log (`Latitude' : ${crd.latitude}`);
//   console.log (`Longitude : ${crd.longitude}`);
//   console.log(`More or less ${crd.accuracy} metres. `);
// }

// errorr = (err) => {
//   console.warn(`ERROR(${err.code}): ${err.message}`);
// }

// navigator.geolocation.getCurrentPosition(success, error, options);


  searchStart = (event) => {
    event.preventDefault()
    request.get("http://api.positionstack.com/v1/forward", {
      'access_key': process.env.POSITION_STACK_API_KEY,
      "country": "NZ",
      '& query': this.state.startPoint,
    }).then(res => {
      this.props.dispatch(searchAddress(res.body.data))
    }).then(res => {
      this.setState({
        START: !this.state.START
      })
    })
  }

    searchDestination = (event) => {
      event.preventDefault()
      request.get("http://api.positionstack.com/v1/forward", {
        'access_key': process.env.POSITION_STACK_API_KEY,
        "country": "NZ",
        '& query': this.state.destination,
      }).then(res => {
        this.props.dispatch(searchAddress(res.body.data))
      }).then(res => {
        this.setState({
          END: !this.state.END
        })
      })
    }


    // ADD STOP OVER TO ROUTE!!!!
    // searchStop = (event) => {
    //   event.preventDefault()
    //   request.get("http://api.positionstack.com/v1/forward", {
    //     'access_key': process.env.POSITION_STACK_API_KEY,
    //     "country": "NZ",
    //     '& query': this.state.stopOver,
    //   }).then(res => {
    //     if (confirm(`Is ${res.body.data[0].label} the correct destination?`)) {
    //       const newArray = this.state.inbetweenWaypoints
    //       newArray.push({
    //         buildingName: res.body.data[0].name,
    //         label: res.body.data[0].label,
    //         latitude: res.body.data[0].latitude,
    //         longitude: res.body.data[0].longitude,
    //         streetName: res.body.data[0].street,
    //       })
    //       this.setState({
    //         inbetweenWaypoints: newArray,
    //       })
    //     }
    //   })
    // }



    render() {
      return (
        <>
          <div className="background-div" >
            <div className='landing-page-content-div'>
              <div id="landing-page-title-container">
              <h1 className='landing-page-title'>Cheeky Road Trip</h1>
              <h3 className='landing-page-subtitle' >Tell us where you're going!</h3>
              </div>
 
 <div id="landingpage-form-container">
              <form className='waypoints-form' onSubmit={this.handleSubmit}>

                {/* Start / Destination Form */}

                <label className="landing-page-form-boxes">
                  {/* Trip Name */}
                <input className="input is-rounded is-expanded" onChange={this.handleChange} type="text" placeholder="Name Your Roadtrip!" name="tripName" />
                <button className="button is-rounded is-small">Enter</button>
                </label>


                <label className="landing-page-form-boxes" >
                  {/* Start-Point: */}
                <input className="input is-rounded is-expanded" onChange={this.handleChange} type="text" name="startPoint" placeholder="Add Start Point" />
                  <button className="button is-rounded is-small" onClick={this.searchStart}>Search</button>
                  {this.state.START ? <AddressConfirm waypointName="START" hideOptions={this.hideAddressOptions} /> : ''}
                </label>

                {/* <label className="address-confirm-list">
                Stop-Over:
                <input onChange={this.handleChange} type="text" name="stopOver" />
                <button onClick={this.searchStop}>Search</button>
              </label> */}

                <label className="landing-page-form-boxes">
                  {/* Destination: */}
                <input className="input is-rounded is-expanded" onChange={this.handleChange} type="text" name="destination" placeholder="Add Destination" />
                  <button className="button is-rounded is-small " onClick={this.searchDestination}>Search</button>
                  {this.state.END ? <AddressConfirm waypointName="END" hideOptions={this.hideAddressOptions} /> : ''}
                </label>

                <input  className="lets-go-button button is-primary" type="submit" value="Let's go!" />

                {/* Start / Destination Form */}

              </form>
              </div>

            </div>
          </div>
        </>

      )
    }
  }
  const mapStateToProps = ({ waypointConfirmation, currentTrip }) => {
    return {
      waypointConfirmation,
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