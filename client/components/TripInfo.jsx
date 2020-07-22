import React from 'react'
import { connect } from 'react-redux'

class TripInfo extends React.Component {

  render() {
    return (
      <div id="trip-info-div">
        <h2 className="trip-title">{this.props.currentTrip.tripName}</h2>
        <h3><b>From: </b> <br></br>{this.props.currentTrip.START.buildingName}</h3>
        {this.props.currentTrip.MID.map((element, i) => {
          return <h3 key={i}><b>Stop In: </b>{element.buildingName}</h3>
        })}
        <h3><b>To:</b> <br></br> {this.props.currentTrip.END.buildingName}</h3>
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