import React from 'react'
import { connect } from 'react-redux'


class HomePage extends React.Component {

  state = {
    from: '',
    to: ''
  }

  handleChange = (event) => {
    console.log('form is changing!')
  }

  handleSubmit = (event) => {
    event.preventDefault()
    console.log(this.props)
    this.props.showHome(false)
  }

  render() {
    return (
      <>
        <div className="background-div" >
          <div className='landing-page-content-div'>
            <h1 className='landing-page-title'>Cheeky Road Trip </h1>
            <h3 className='landing-page-subtitle' >Tell us where you're going!</h3>
            <form onSubmit={this.handleSubmit}>
              <label id="display-block">
                From:
                <input onChange={this.handleChange} type="text" name="from" />
              </label>

              <label id="display-block">
                To:
                <input onChange={this.handleChange} type="text" name="to" />
              </label>
              <input id="display-block" type="submit" value="Let's go!" />
            </form>
          </div>
        </div>
      </>

    )
  }
}
const mapStateToProps = ({ currentTrip }) => {
  return {
    currentTrip
  }
}

export default connect(mapStateToProps)(HomePage)