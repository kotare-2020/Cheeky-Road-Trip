import React from 'react'
import { connect } from 'react-redux'

class TripInfo extends React.Component {
    render() {
        return (
            <div id="trip-info-div">
                <h2 className="trip-title">{this.props.currentTrip.tripName}</h2>
                <h3>From: {this.props.currentTrip.startWaypoint.buildingName}</h3>
                <h3>To: {this.props.currentTrip.endWaypoint.buildingName}</h3>
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