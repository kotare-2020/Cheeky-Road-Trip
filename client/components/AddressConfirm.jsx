import React from 'react'
import { connect } from 'react-redux'

class AddressConfirm extends React.Component {

    addressOptions = this.props.waypointConfirmation.waypointsArray

    render() {
        console.log('address confrim component props ----> ', this.addressOptions)
        return (
            <div className="address-confirm-list" >

                <ul>
                    {this.addressOptions.map(addressInfo => {
                        return (
                            <div className="address-confirm-item">
                                <h3><u>Is this the correct option bitch?</u></h3>
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


