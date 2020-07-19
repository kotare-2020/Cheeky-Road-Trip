import React from 'react'
import { connect } from 'react-redux'

import {confirmAddress} from '../actions/currentTrip'

class AddressConfirm extends React.Component {

    addressOptions = this.props.waypointConfirmation.waypointsArray

    handleSelect = (addressInfo) => {
        console.log('checkbox function', addressInfo)       
        
        let startWaypoint =  {
                    buildingName: addressInfo.name,
                    label: addressInfo.label,
                    latitude: addressInfo.latitude,
                    longitude: addressInfo.longitude,
                    streetName: addressInfo.street,
                  }
                //   this.props.dispatch(confirmAddress(startWaypoint))

                console.log('ur new thing' , this.props)
                this.props.hideOptions()
    }

    render() {
        console.log('address confrim component props ----> ', this.addressOptions)
        return (
            <div className="address-confirm-list" >

                <ul>
                    {this.addressOptions.map(addressInfo => {
                        return (

                            <div className="address-confirm-item">
                                <input onChange={() => this.handleSelect(addressInfo)} type="checkbox" name="vehicle1" ></input>
                                <p>{addressInfo.label}</p>
                                <p>{addressInfo.region}</p>
                            </div>

                        )
                    })}
                </ul>





            </div>

        )
    }
}


const mapStateToProps = ({ waypointConfirmation, currentTrip }) => {
    return {
        waypointConfirmation,
        currentTrip
    }
}

export default connect(mapStateToProps)(AddressConfirm)


