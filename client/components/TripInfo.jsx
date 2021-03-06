import React from 'react'
import { connect } from 'react-redux'

class TripInfo extends React.Component {
  timeDisplay = (seconds) => {
    let h = Math.floor(seconds / 3600)
    let m = Math.floor((seconds / 60) - (Math.floor(seconds / 3600) * 60))
    let s = seconds - (Math.floor(seconds / 60) * 60)
    return (`${h}` + `:${m}` + `:${s}`)
  }
  render() {
    return (
      <div id="trip-info-div">
        <h2 className="trip-title">{this.props.currentTrip.tripName}</h2>
        <h3><b>From: </b> <br></br>{this.props.currentTrip.START.buildingName}</h3>
        {this.props.currentTrip.MID.map((element, i) => {
          return <h3 key={i}><b>Stop In: </b>{element.buildingName}</h3>
        })}
        <h3><b>To:</b> <br></br> {this.props.currentTrip.END.buildingName}</h3>
        {/* replace big number with duration from redux state when hooked up */}
        {/* <h3>Duration: {this.timeDisplay(12542)}</h3> */}
      </div>

    )
  }
}

const mapStateToProps = ({ currentTrip }) => {
  return {
    currentTrip,
  }
}

export default connect(mapStateToProps)(TripInfo)