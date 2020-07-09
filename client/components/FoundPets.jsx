import React from "react"
import { connect } from "react-redux"

class FoundPets extends React.Component {

    render() {
        console.log(this.props.animals);
        
        return this.props.animals.map((animal) => {
            return(
                <li>
                    <img src={`${animal.photo}`}/>
                    <p>Animal</p>
                </li>
            )
        })
    }

}

export default connect ()(FoundPets)