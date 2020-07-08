import React from "react"
import { connect } from "react-redux"

class LostAnimals extends React.Component {

    render() {
        return this.props.animals.map((animal) => {
            return(
                <li>
                    <img>{animal.photo}</img>
                </li>
            )
        })
    }

}

export default connect ()(LostAnimals)