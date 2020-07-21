import React from 'react'
import { connect } from 'react-redux'

class DirectionsList extends React.Component {
  render() {
    return (
      <div id="directions-list-div">
        <h3><b>Directions</b></h3>
        <ul className="directions-list">
          {this.props.currentTrip.tripInstructions.map((element, i) => {
            return <li key={i}>{i+1}. {element}</li>
          })}
        </ul>
      </div>
    )
  }
}

const mapStateToProps = ({ currentTrip }) => {
  return {
    currentTrip,
  }
}


export default connect(mapStateToProps)(DirectionsList)
