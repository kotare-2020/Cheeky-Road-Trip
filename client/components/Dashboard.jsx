import React from 'react'

//Import components
import TripInfo from './TripInfo'
import DirectionsList from './DirectionsList'
import Mapbox from './Mapbox'




class Dashboard extends React.Component {

    handleClick = () => {
        this.props.showHome(true)
    }

    render() {
        return (
            <>
                <button id="home-button" className="button is-info is-small is-rounded" onClick={this.handleClick} > Home </button>
                <div id="dashboard-container">
                    <div className="column-left-dashboard">
                        <TripInfo />
                        <DirectionsList />
                    </div>

                    <div className="column-right-dashboard" >
                        <Mapbox />
                    </div>
                </div>
            </>
        )
    }
}

export default Dashboard