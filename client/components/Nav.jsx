import React from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {logoutUser} from '../actions/logout'

class Nav extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      showBurger: false
    }
    this.toggleBurger = this.toggleBurger.bind(this)
  }
  toggleBurger() {
    this.setState({showBurger: !this.state.showBurger})
  }
  render() {
    const {auth} = this.props
    const {showBurger} = this.state
    return <nav className="navbar">
      <div className="container">
        <div className="navbar-brand">
          <span onClick={this.toggleBurger} className={`navbar-burger burger ${showBurger ? 'is-active': ''}`} data-target="navbarMenuHeroA">
            <span></span>
            <span></span>
            <span></span>
          </span>
        </div>
        <div id="navbarMenuHeroA" className={`navbar-menu ${showBurger ? "is-active" : ''}`}>
          <div className="navbar-end">
            {auth.isAuthenticated
              ? [
                <Link onClick={this.toggleBurger} className="navbar-item" to="/meeting">Start Meeting</Link>,
                <Link onClick={this.toggleBurger} className="navbar-item" to="/history">Meeting History</Link>,
                <a className="navbar-item" onClick={() => props.logout()}>Logout</a>
              ]
              : [
                <Link onClick={this.toggleBurger} className="navbar-item is-large" to='/login'>Login</Link>,
                <Link onClick={this.toggleBurger} className="navbar-item" to='/register'>Register</Link>
              ]
            }
          </div>
        </div>
      </div>
    </nav>
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    logout: () => dispatch(logoutUser())
  }
}

const mapStateToProps = ({auth}) => {
  return {auth}
}

export default connect(mapStateToProps, mapDispatchToProps)(Nav)
