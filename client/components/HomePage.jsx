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
              <h1 className='landing-page-title'>Cheeky Road Trip</h1>
              <h3 className='landing-page-subtitle' >Tell us where you're going!</h3>
              <form className='waypoints-form' onSubmit={this.handleSubmit}>

                <label className="landing-page-form-boxes">
                  Trip Name:
                <input className="input is-rounded is-small" onChange={this.handleChange} type="text" name="tripName" />
                </label>

                <label className="landing-form-elements" >
                  Start-Point:
                <input className="input is-rounded is-small" onChange={this.handleChange} type="text" name="startPoint" />
                  <button className="button is-rounded is-small" onClick={this.searchStart}>Search</button>
                  {this.state.START ? <AddressConfirm waypointName="START" hideOptions={this.hideAddressOptions} /> : ''}
                </label>

                <label className="landing-form-elements" >
                  Stop Over:
                <input className="input is-rounded is-small" onChange={this.handleChange} type="text" name="midPoint" />
                  <button className="button is-rounded is-small" onClick={this.searchMid}>Search</button>
                  {this.state.MID ? <AddressConfirm waypointName="MID" hideOptions={this.hideAddressOptions} /> : ''}
                </label>

                <label className="landing-page-form-boxes">
                  Destination:
                <input className="input is-rounded is-small" onChange={this.handleChange} type="text" name="endPoint" />
                  <button className="button is-rounded is-small " onClick={this.searchEnd}>Search</button>
                  {this.state.END ? <AddressConfirm waypointName="END" hideOptions={this.hideAddressOptions} /> : ''}
                </label>

                <input className="button is-rounded is-small" className="landing-page-form-boxes" type="submit" value="Let's go!" />
              </form>
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