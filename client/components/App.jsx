import React from 'react'
import { HashRouter as Router, Route, Link } from 'react-router-dom'
import { connect } from 'react-redux'

// import { checkAuth } from '../actions/auth'

import { Map, Marker, Popup, TileLayer } from 'react-leaflet'
import { Icon } from 'leaflet'
import bathroomData from '../../data/bathroom_data.json'
import LeafletMap from './LeafletMap'
import HomePage from './HomePage'
import Dashboard from './Dashboard'


export class App extends React.Component {
  state = {
    showHome: true
  }

  setShowHome = (string) => {
    this.setState({
      showHome: string //boolean? lol
    })
  }

  render() {
    return (
      <>
        {this.state.showHome ?
          <HomePage showHome={this.setShowHome} />
          :
          <Dashboard showHome={this.setShowHome} />
        }


        {/* <Map center={[-39.291890, 174.267720]} zoom={12}>
          <TileLayer
            url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          />
          {bathroomData.features.map((bathroom) => {
            <Marker key={bathroom.properties.OBJECTID} position={[175.611366, -40.355660]} />
          })}
        </Map> */}
      </>
    )
  }
}

const mapStateToProps = ({ auth, currentTrip }) => {
  return {
    auth,
    currentTrip,
  }
}

export default connect(mapStateToProps)(App)

