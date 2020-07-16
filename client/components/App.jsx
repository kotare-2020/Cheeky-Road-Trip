import React from 'react'
import { HashRouter as Router, Route, Link } from 'react-router-dom'
import { connect } from 'react-redux'

// import { checkAuth } from '../actions/auth'

import { Map, Marker, Popup, TileLayer } from 'react-leaflet'
import { Icon } from 'leaflet'
import bathroomData from '../../data/bathroom_data.json'
import LeafletMap from './LeafletMap'
import HomePage from './HomePage'


class App extends React.Component {

  state = {
    showHome: true
  }

  setShowHome = (string) => {
    console.log('data in app setshowhome', string)
    this.setState({
      showHome: string
    })
  }

  render() {

    return (
      <>
        {this.state.showHome ?
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

const mapStateToProps = ({ auth }) => {
  return {
    auth
  }
}

export default connect(mapStateToProps)(App)

