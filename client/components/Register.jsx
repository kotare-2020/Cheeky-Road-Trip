import React from 'react'
import {connect} from 'react-redux'
import {registerUserRequest} from '../actions/register'

class Register extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      user_name: '',
      password: '',
      confirm_password: ''
    }
    this.updateDetails = this.updateDetails.bind(this)
    this.submit = this.submit.bind(this)
  }
  updateDetails(e) {
    this.setState({[e.target.name]: e.target.value})
  }
  submit(e) {
    e.preventDefault()
    e.target.reset()
    let {user_name, password, confirm_password} = this.state
    if (password == confirm_password) this.props.dispatch(registerUserRequest({user_name, password}))
  }
  render() {
    return (
      <form className="Register form box" onSubmit={this.submit}>
        <h1 className="title is-2">Register</h1>
        <hr />
        <label className="column is-6 is-offset-one-quarter label is-large has-text-centered">Username
          <input required className="input is-large has-text-centered is-fullwidth" placeholder="User Name" type="text" name="user_name" onChange={this.updateDetails}/>
        </label>
        <div className="columns">
          <label className="column is-6 label is-large has-text-centered">First Name
            <input required className="input is-large has-text-centered is-fullwidth" placeholder="First Name" type="text" name="first_name" onChange={this.updateDetails}/>
          </label>
          <label className="column is-6 label is-large has-text-centered">Last Name
            <input required className="input is-large has-text-centered is-fullwidth" placeholder="Last Name" type="text" name="last_name" onChange={this.updateDetails}/>
          </label>
        </div>
        <hr />
        <div className="columns">
          <label className="column is-6 label is-large has-text-centered">Password
            <input required className="input is-large has-text-centered is-fullwidth" placeholder="Password" type="password" name="password" onChange={this.updateDetails}/>
          </label>
          <label className="column is-6 label is-large has-text-centered">Confirm Password
            <input required className="input is-large has-text-centered is-fullwidth" placeholder="Confirm Password" type="password" name="confirm_password" onChange={this.updateDetails}/>
          </label>
        </div>
          <input className="button is-success is-large is-fullwidth" value="Register" type="submit" />
      </form>
    )
  }
}

export default connect()(Register)
