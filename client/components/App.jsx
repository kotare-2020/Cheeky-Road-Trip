import React from 'react'

//Component imports
import HomePage from './HomePage'
import Dashboard from './Dashboard'


class App extends React.Component {
  state = {
    showHome: true
  }

  setShowHome = (string) => {
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
          <Dashboard showHome={this.setShowHome} />
        }
      </>
    )
  }
}


export default App
