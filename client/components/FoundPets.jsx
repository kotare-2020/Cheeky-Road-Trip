import React from "react"
import { connect } from "react-redux"
import FoundForm from './FoundForm'

class FoundPets extends React.Component {

    state = {
        showForm: false
    }

    handleClick = () => {
        console.log ('clicking!')
        this.setState ({
        showForm: true
    })
    }

    render() {
        
        return this.props.animals.map((animal) => {
            return(
                <>
                <button className="title is-2" onClick = {this.handleClick}>Report / Add a Found Animal</button>
                
                
                <FoundForm/>

                <li>
                    <img src={`${animal.photo}`}/>
                    <p>Animal</p>
                </li>
                </>
            )
        })
    }

}

export default connect ()(FoundPets)