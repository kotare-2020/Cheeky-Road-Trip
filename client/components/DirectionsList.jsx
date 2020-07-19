import React from 'react'
import { connect } from 'react-redux'

class DirectionsList extends React.Component {
  render() {
    return (
      <div id="directions-list-div">
        <h3>Directions</h3>
        <ol className="directions-list">
          {this.props.currentTrip.tripInstructions.map((element, i) => {
            return <li>{i+1}. {element}</li>
          })}
        </ol>
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
