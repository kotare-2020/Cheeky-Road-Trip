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
<<<<<<< HEAD
                <h2 className="trip-title">{this.props.currentTrip.tripName}</h2>
                <h3>From: {this.props.currentTrip.startWaypoint.buildingName}</h3>
                <h3>To: {this.props.currentTrip.endWaypoint.buildingName}</h3>
||||||| 4c2a4a9
                <h2>Trip Info</h2>
                <h3>From: Masterton</h3>
                <h3>To: Auckland</h3>
=======
                <h2>Trip Info</h2>
                <h3>From: Masterton</h3>
                <h3>To: Auckland</h3>
                {/* replace big number with duration from redux state when hooked up */}
                <h3>Duration: {this.timeDisplay(12542)}</h3>

>>>>>>> 042095eeeacb4a416e9d2323cf47683310896c24
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