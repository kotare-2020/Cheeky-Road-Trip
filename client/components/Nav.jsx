import React from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {logoutUser} from '../actions/logout'

function Nav (props) {
  console.log({props});
  return <nav className="navbar">
    <div className="container">
      <div className="navbar-brand">
        <span className="navbar-burger burger" data-target="navbarMenuHeroA">
          <span></span>
          <span></span>
          <span></span>
        </span>
      </div>
      <div id="navbarMenuHeroA" className="navbar-menu">
        <div className="navbar-end">
          {props.auth.isAuthenticated
            ? [
              <Link className="navbar-item" to="/meeting">Start Meeting</Link>,
              <Link className="navbar-item" to="/history">Meeting History</Link>,
              <a className="navbar-item" onClick={() => props.logout()}>Logout</a>
            ]
            : [
            <Link className="navbar-item is-large" to='/login'>Login</Link>,
            <Link className="navbar-item" to='/register'>Register</Link>
            ]
          }
        </div>
      </div>
    </div>
  </nav>
}
// {/* <div classNameName="Nav">
// <Link to="/">Home</Link>{" | "}
// {props.auth.isAuthenticated
// ? <button onClick={() => props.dispatch(logoutUser())}>Logout</button>
// : <div>
// <Link to="/login">Login</Link>{" | "}
// <Link to="/register">Register</Link>
// </div>
// }
//
// </div>
// ) */}
const mapDispatchToProps = (dispatch) => {
  return {
    logout: () => dispatch(logoutUser())
  }
}

const mapStateToProps = ({auth}) => {
  return {auth}
}

export default connect(mapStateToProps, mapDispatchToProps)(Nav)
