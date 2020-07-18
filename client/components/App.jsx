import React from 'react'
import { HashRouter as Router, Route, Link } from 'react-router-dom'
import { connect } from 'react-redux'
// import { checkAuth } from '../actions/auth'
import bathroomData from '../../data/bathroom_data.json'
import HomePage from './HomePage'
import Dashboard from './Dashboard'


class App extends React.Component {
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
      </>
    )
  }
}

const mapStateToProps = ({ auth }) => {
  return {
    auth,
  }
}

export default connect(mapStateToProps)(App)
