import React from 'react'
import { HashRouter as Router, Route, Link } from 'react-router-dom'
import { connect } from 'react-redux'

import Login from './Login'
import Register from './Register'
import Nav from './Nav'
import FoundPets from './FoundPets'
import { fetchAnimals } from '../actions/found'
import HomePage from './HomePage'
import LostPets from './LostPets'
import { checkAuth } from '../actions/auth'

import { Map, Marker, Popup, TileLayer } from 'react-leaflet'
import { Icon } from 'leaflet'
import bathroomData from '../../data/bathroom_data.json'


export class App extends React.Component {
  componentDidMount() {
    const confirmSuccess = () => { }
    this.props.dispatch(checkAuth(confirmSuccess))
    this.props.dispatch(fetchAnimals())
  }



  render() {
    const { auth } = this.props
    return (
      <>
        <Router>

          <div className="container has-text-centered">

            <div className="hero is-small is-primary">
              <div className="hero-body has-text-centered">
                <Link to='/' className="">
                  <h1 className="title is-1">Lost and Found</h1>
                </Link>
                <Nav />
              </div>
            </div>

            <div className=''>
              {!auth.isAuthenticated &&
                <>
                  <Route exact path="/" component={Login} />
                  <Route path="/lost" component={LostPets} />
                </>
              }
              {auth.isAuthenticated ? <HomePage /> : <></>}
              <Route path="/home" component={HomePage} />
              <Route path="/login" component={Login} />
              <Route path="/register" component={Register} />

            </div>
            <FoundPets animals={this.props.foundPets} />
          </div>
        </Router>
        <Map center={[-39.291890, 174.267720]} zoom={12}>
          <TileLayer
            url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          />
          {bathroomData.features.map((bathroom) => {
            <Marker key={bathroom.properties.OBJECTID} position={[175.611366, -40.355660]} />
          })}
        </Map>
      </>
    )
  }
}

const mapStateToProps = ({ auth, foundPets }) => {
  return {
    auth,
    foundPets
  }
}

export default connect(mapStateToProps)(App)
