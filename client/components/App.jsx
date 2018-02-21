import React from 'react'
import {HashRouter as Router, Route, Link} from 'react-router-dom'

import Login from './Login'
import Register from './Register'
import Nav from './Nav'
import Meeting from './Meeting'
import History from './History'

const App = () => (
  <Router>
    <div className="container has-text-centered">

      <div className="hero is-small is-primary">
        <div className="hero-body has-text-centered">
          <Link to='/' className="">
            <h1 className="title is-1">$how Me The Money</h1>
          </Link>
          <Nav />
        </div>
      </div>

      <div className=''>
        <Route path="/login" component={Login} />
        <Route path="/register" component={Register} />
        <Route path="/meeting" component={Meeting} />
        <Route path="/history" component={History} />
      </div>

    </div>
  </Router>
)

export default App
