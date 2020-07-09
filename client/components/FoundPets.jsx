import React from "react"
import { connect } from "react-redux"

class FoundPets extends React.Component {

    render() {
        console.log(this.props);
        
        return this.props.animals.map((animal) => {
            return(
                <li>
                    <img src={`${animal.photo}`} alt=""/>
                    <p>ANIMAL</p>
                </li>
            )
        })
    }
}

// function mapStateToProps(globalState) {
//     return {
//         animals: globalState.animals
//     }
// }

export default connect ()(FoundPets)