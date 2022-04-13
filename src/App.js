import './SeasonDisplay.css'

import React from "react";
import SeasonDisplay from "./SeasonDisplay";
import Spinner from "./Spinner";
class App extends React.Component {

  // THIS IS THE ONLY TIME we do direct assignment
  // to state
  // Babel transform this to constructor
  // even if we didn't define it 
  state = { lat: null, errorMessage: '' };

  componentDidMount() {
    // console.log('My was rendered to the screen');
    // we place the 
    window.navigator.geolocation.getCurrentPosition(
      (position) => {
        // we call setState to change or update or manipulate the state
        this.setState({ lat: position.coords.latitude });

        // NEVER change or update or manipulate our state property directly ALWAYS use setState()
        //this.state.lat = position.coords.latitude
      },
      (err) => {
        this.setState({ errorMessage: err.message })
      }
    );
  }

  componentDidUpdate() {
    console.log('My component wa just updated - it rerendred!');
  }
  // helper function we create 
  // to avoid conditionals in Render
  renderContent() {
    if (this.state.errorMessage && !this.state.lat) {
      return <div>Error: {this.state.errorMessage}</div>
    }

    if (!this.state.errorMessage && this.state.lat) {
      return <SeasonDisplay lat={this.state.lat} />
    }

    return <Spinner message="Please accept location request" />
  }

  // React says we have to define render!!
  render() {
    return (
      <div className="border-red">
        {this.renderContent()}
      </div>
    )
  }
}

export default App;
