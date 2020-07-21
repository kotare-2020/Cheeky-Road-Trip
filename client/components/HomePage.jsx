import React from 'react'
import { connect } from 'react-redux'
import request from 'superagent'

//Component Imports
import AddressConfirm from './AddressConfirm'

// Actions imports
import { addTripName } from '../actions/currentTrip'
import { searchAddress } from '../actions/waypointConfirmation'


class HomePage extends React.Component {

  state = {
    tripName: '',
    startPoint: '',
    midPoint: '',
    endPoint: '',
    START: false,
    END: false,
    MID: false,
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
    this.props.dispatch(addTripName(this.state.tripName))
    this.props.showHome(false)
  }

  doNothing = (e) => {
    e.preventDefault() 
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

  searchMid = (event) => {
    event.preventDefault()
    request.get("http://api.positionstack.com/v1/forward", {
      'access_key': process.env.POSITION_STACK_API_KEY,
      "country": "NZ",
      '& query': this.state.midPoint,
    }).then(res => {
      this.props.dispatch(searchAddress(res.body.data))
    }).then(res => {
      this.setState({
        MID: !this.state.MID
      })
    })
  }

  searchEnd = (event) => {
    event.preventDefault()
    console.log(process.env)
    request.get("http://api.positionstack.com/v1/forward", {
      'access_key': process.env.POSITION_STACK_API_KEY,
      "country": "NZ",
      '& query': this.state.endPoint,
    }).then(res => {
      this.props.dispatch(searchAddress(res.body.data))
    }).then(res => {
      this.setState({
        END: !this.state.END
      })
    })
  }





  render() {
    return (
      <>
        <div className="background-div" >
          <div className='landing-page-content-div'>
            <div className="animate__animated animate__bounceInLeft" id="landing-page-title-container">
              <h1 className='landing-page-title'>Cheeky Road Trip</h1>
              <h3 className='landing-page-subtitle' >Tell us where you're going!</h3>
            </div>

            <div id="landingpage-form-container">
              <form className='waypoints-form' onSubmit={this.handleSubmit}>

                <label className="landing-page-form-boxes">
                  {/* Trip Name */}
                  <input className="input is-rounded is-expanded" onChange={this.handleChange} type="text" placeholder="Name Your Roadtrip!" name="tripName" />
                  <button onClick={this.doNothing} className="button is-rounded is-small">Enter</button>
                </label>


                <label className="landing-page-form-boxes" >
                  {/* Start-Point: */}
                  <input className="input is-rounded is-expanded" onChange={this.handleChange} type="text" name="startPoint" placeholder="Add Start Point" />
                  <button className="button is-rounded is-small" onClick={this.searchStart}>Search</button>
                  {this.state.START ? <AddressConfirm waypointName="START" hideOptions={this.hideAddressOptions} /> : ''}
                </label>

                <i src></i>
                <label className="landing-page-form-boxes" >
                  {/* Stop Over: */}
                  <input className="input is-rounded is-expanded" onChange={this.handleChange} type="text" name="midPoint" placeholder="Add Stop Over" />
                  <button className="button is-rounded is-small" onClick={this.searchMid}>Search</button>
                  {this.state.MID ? <AddressConfirm waypointName="MID" hideOptions={this.hideAddressOptions} /> : ''}
                </label>

                <label className="landing-page-form-boxes">
                  {/* Destination: */}
                  <input className="input is-rounded is-expanded" onChange={this.handleChange} type="text" name="endPoint" placeholder="Add Destination" />
                  <button className="button is-rounded is-small" onClick={this.searchEnd}>Search</button>
                  {this.state.END ? <AddressConfirm waypointName="END" hideOptions={this.hideAddressOptions} /> : ''}
                </label>

                {/* <div class="svg-wrapper">
                <svg height="60" width="320" xmlns="http://www.w3.org/2000/svg">
                <rect class="shape" height="60" width="320"/> */}
                <input className="lets-go-button button is-rounded" type="submit" value="Let's go!" />
                {/* </svg>
                </div> */}
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