import React from 'react'

//Import components
import LeafletMap from '../components/Map'
import TripInfo from './TripInfo'
import DirectionsList from './DirectionsList'




class Dashboard extends React.Component {
    
    handleClick = () => {
        this.props.showHome(true)
    }



    render() {
        return (
            <>
            
            <div id="dashboard-container">
            <button onClick={this.handleClick} > Home </button>
            <div className="column-left-dashboard">
            <TripInfo/>
            <DirectionsList/>
            </div>

            <div className="column-right-dashboard" >
            <LeafletMap />
            </div>
            
            
            </div>
            </>
        )
    }
}

export default Dashboard