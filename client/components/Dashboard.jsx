import React from 'react'

//Import components
import TripInfo from './TripInfo'
import DirectionsList from './DirectionsList'
import Mapbox from './Mapbox'




class Dashboard extends React.Component {
    
    handleClick = () => {
        this.props.showHome(true)
        console.log(process.env.POSITION_STACK_API_KEY)
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
                <Mapbox/>
            {/* <LeafletMap /> */}
            </div>
            
            
            </div>
            </>
        )
    }
}

export default Dashboard