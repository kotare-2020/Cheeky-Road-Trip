import React from 'react'
import { connect } from 'react-redux'

// Actions imports
import { confirmAddress } from '../actions/currentTrip'

class AddressConfirm extends React.Component {

    addressOptions = this.props.waypointConfirmation.waypointsArray

    handleSelect = (addressInfo , waypointName) => {
        let waypoint = {
            buildingName: addressInfo.name,
            label: addressInfo.label,
            latitude: addressInfo.latitude,
            longitude: addressInfo.longitude,
            streetName: addressInfo.street,
        }
        this.props.dispatch(confirmAddress(waypoint, waypointName))
        this.props.hideOptions(waypointName)
    }

    render() {

        return (
            <div className="address-confirm-list" >
                <ul>
                    {this.addressOptions.map((addressInfo, i) => {
                        return (

                            <div key={i} className="address-confirm-item">
                                <input onChange={() => this.handleSelect(addressInfo, this.props.waypointName)} type="checkbox" name="confirmAddress" ></input>
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


