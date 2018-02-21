import React from 'react'
import {HashRouter as Router, Route} from 'react-router-dom'

import Login from './Login'
import Register from './Register'
import Nav from './Nav'

const App = () => (
  <Router>
    <div className="container has-text-centered">

      <div className="hero is-small is-primary">
        <div className="hero-body">
          <Nav />
        </div>
      </div>

      <div className='app-container'>
        <Route path="/login" component={Login} />
        <Route path="/Register" component={Register} />
      </div>

    </div>
  </Router>
)

export default App
