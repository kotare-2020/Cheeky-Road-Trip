import React from 'react'
import { HashRouter as Router, Route, Link } from 'react-router-dom'
import { connect } from 'react-redux'

// import { checkAuth } from '../actions/auth'

import { Map, Marker, Popup, TileLayer } from 'react-leaflet'
import { Icon } from 'leaflet'
import bathroomData from '../../data/bathroom_data.json'
import LeafletMap from '../components/Map'
import HomePage from './HomePage'


export class App extends React.Component {
georgy/*
  state = {
    showHome: true
  }

  setShowHome = (string) => {
    console.log('data in app setshowhome', string)
    this.setState({
      showHome: string
    })
  }
*/
setWaypoints
  render() {

    return (
      <>
        {this.props.haveWaypoints ?
          <HomePage showHome={this.setShowHome} />
          :
          <div>
            <LeafletMap />
          </div>
        }
      </>
    )
  }
}

const mapStateToProps = ({ auth, globalState }) => {
  return {
    auth,
    haveWaypoints: globalState.haveWaypoints
  }
}

export default connect(mapStateToProps)(App)

