import React from 'react'
import { HashRouter as Router, Route, Link } from 'react-router-dom'
import { connect } from 'react-redux'

// import Login from './Login'
// import Register from './Register'
// import Nav from './Nav'
// import HomePage from './HomePage'
// import { checkAuth } from '../actions/auth'

import { Map, Marker, Popup, TileLayer } from 'react-leaflet'
import { Icon } from 'leaflet'
import bathroomData from '../../data/bathroom_data.json'
import LeafletMap from '../components/Map'


export class App extends React.Component {
  componentDidMount() {
    // const confirmSuccess = () => { }
    // this.props.dispatch(checkAuth(confirmSuccess))

  }



  render() {
    // const { auth } = this.props
    return (
      <>
        {/* <Router>


          <div className=''>
            {!auth.isAuthenticated &&
              <>
                <Route exact path="/" component={Login} />
              </>
            }
            {auth.isAuthenticated ? <HomePage /> : <></>}
            <Route path="/home" component={HomePage} />
            <Route path="/login" component={Login} />
            <Route path="/register" component={Register} />

          </div>
        </Router> */}
        <HomePage/>
        {/* <Map center={[-39.291890, 174.267720]} zoom={12}> */}

<div>
      <LeafletMap />
    </div>

    
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

const mapStateToProps = ({ auth }) => {
  return {
    auth
  }
}

export default connect(mapStateToProps)(App)
