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
            
            <div className="flex-column">
            <TripInfo/>
            <DirectionsList/>
            </div>

            <div>
            <LeafletMap />
            </div>
            
            
            </div>
            </>
        )
    }
}

export default Dashboard