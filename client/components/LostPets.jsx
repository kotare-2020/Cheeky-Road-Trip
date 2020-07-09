import React from "react"
import { connect } from "react-redux"

import { fetchLostPets } from '../actions/lost'

class LostPets extends React.Component {


    componentDidMount() {
        //this is where the initial request for the tasks gets sent from. this one is going to actions
        this.props.dispatch(fetchLostPets())

    }

    render() {
        // console.log(this.props)
        return (
        <>
        <h1>LOST PETS</h1>
        {this.props.lostPets.map((pet, i) => {
            return (
            <div>
                <img src={pet.photo} key={pet.id} />
                <p>
                    {pet.name} </p>
                <p>{pet.species}</p>
            </div>
            )
        })}
        </>
    )}
}
        


function mapStateToProps(globalState) {
    return {
        lostPets: globalState.lostPets
    }
}

export default connect(mapStateToProps)(LostPets)