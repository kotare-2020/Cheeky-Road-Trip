import React from "react"
import { connect } from "react-redux"

import { fetchLostPets } from '../actions/lost'

import LostForm from './LostForm'

class LostPets extends React.Component {

    componentDidMount() {
        //this is where the initial request for the tasks gets sent from. this one is going to actions
        this.props.dispatch(fetchLostPets())

    }

    render() {
        return (
            <>
                <h1 className="title is-1">LOST PETS</h1>
                {this.props.auth.isAuthenticated ?
                    <>
                        <LostForm />

                        {this.props.lostPets.map((pet, i) => {
                            return (
                                <div>
                                    <img src={pet.photo} key={pet.id} />
                                    <p>{pet.name} </p>
                                    <p>{pet.species}</p>
                                </div>
                            )
                        })}
                    </>
                    :
                    <>
                        {this.props.lostPets.map((pet, i) => {
                            return (
                                <div>
                                    <img src={pet.photo} key={pet.id} />
                                    <p>{pet.name} </p>
                                    <p>{pet.species}</p>
                                </div>
                            )
                        })}

                    </>
                }
            </>
        )
    }
}



function mapStateToProps(globalState) {
    // console.log(globalState)
    return {
        lostPets: globalState.lostPets,
        auth: globalState.auth,
    }
}

export default connect(mapStateToProps)(LostPets)