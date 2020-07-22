import React from 'react'
import { connect } from 'react-redux'


class Waypoints extends React.Component {

    render() {
        return (
            <div id="waypoints-div">
                {this.props.currentTrip.tripName == '' ?
                 <h2 className="trip-title-preview">Trip Info</h2> : 
                 <h2 className="trip-title-preview">{this.props.currentTrip.tripName}</h2> }
                <h3 className="italic-text">Start Point:</h3>
                <p className="homepage-body-text" >{this.props.currentTrip.START.label}</p>
                <h3 className="italic-text">Stop Overs:</h3>
                {this.props.currentTrip.MID.map((element) => {
                    return <p className="homepage-body-text">-{element.label}</p>
                })}
                <h3 className="italic-text" >Destination:</h3>
                <p className="homepage-body-text" >{this.props.currentTrip.END.label}</p>
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