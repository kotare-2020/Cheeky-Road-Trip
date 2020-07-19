import React from 'react'
import { connect } from 'react-redux'

class AddressConfirm extends React.Component {
    
    render() {
        console.log('address confrim component props ----> ', this.props.waypointConfirmation.waypointsArray[0])
        return (
            <div className="address-confirm-list" >
            <p> {this.props.waypointConfirmation.waypointsArray[0].name}</p>   
            </div>

        )
    }
}


const mapStateToProps = ({ waypointConfirmation }) => {
    return {
        waypointConfirmation
    }
  }
  
  export default connect(mapStateToProps)(AddressConfirm)
  

