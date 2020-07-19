import React from 'react'
import { connect } from 'react-redux'

class AddressConfirm extends React.Component {

    addressOptions = this.props.waypointConfirmation.waypointsArray

    handleSelect = (addressInfo) => {
        console.log('checkbox function', addressInfo)
                //   startWaypoint: {
                //     buildingName: res.body.data[0].name,
                //     label: res.body.data[0].label,
                //     latitude: res.body.data[0].latitude,
                //     longitude: res.body.data[0].longitude,
                //     streetName: res.body.data[0].street,
                //   }


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


const mapStateToProps = ({ waypointConfirmation }) => {
    return {
        waypointConfirmation
    }
}

export default connect(mapStateToProps)(AddressConfirm)


