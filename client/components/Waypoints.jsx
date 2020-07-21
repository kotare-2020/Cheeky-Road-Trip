import React from 'react'
import { connect } from 'react-redux'


class Waypoints extends React.Component {

    render() {
        return (
            <div id="waypoints-div">
                <h2>Your journey:</h2>
                <h3>Trip Name:</h3>
                <p>{this.props.currentTrip.tripName}</p>
                <h3>Start Point:</h3>
                <p>-{this.props.currentTrip.START.label}</p>
                <h3>Stop Overs:</h3>
                {this.props.currentTrip.MID.map((element) => {
                    return <p>-{element.label}</p>
                })}
                <h3>Destination:</h3>
                <p>-{this.props.currentTrip.END.label}</p>
            </div>
        )
    }
}

const mapStateToProps = ({ currentTrip }) => {
    return {
        currentTrip,
    }
}

export default connect(mapStateToProps)(Waypoints)