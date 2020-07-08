import React, {Component} from 'react';
import './App.css';
import CurrentDay from './components/CurrentDay.js';

class App extends Component {
  state = {
    latitude: null,
    longitude: null,
    userAddress: null
  }

  getLocation = () =>
  {
    if(navigator.geolocation)
    {
      navigator.geolocation.getCurrentPosition(this.getCoordinates, this.handleLocationErrors);
    }
    else
    {
      console.log('geolocation not supported');
    }
  }

  getCoordinates = (position) =>
  {
    console.log(position)
    this.setState({latitude: position.coords.latitude, longitude: position.coords.longitude})
  }

  getUserAddress = () => {
    
  }

  //error handling for getting location
  handleLocationErrors = (error) => {
    switch(error.code) {
      case error.PERMISSION_DENIED:
        alert("User denied the request for Geolocation."); 
        break;
      case error.POSITION_UNAVAILABLE:
        alert("Location information is unavailable."); 
        break;
      case error.TIMEOUT:
        alert("The request to get user location timed out."); 
        break;
      case error.UNKNOWN_ERROR:
        alert("An unknown error occurred.");
        break;
      default:
        alert("An unknown error occurred."); 
    }
  }

  componentDidMount(){
    this.getLocation();
  }

  render()
  {
    let apiKey = process.env.REACT_APP_GOOGLE_API_KEY;
    return (
      <div className="App">
        {/* <CurrentDay latitude={this.state.latitude} longitude={this.state.longitude} /> */}
        <h1>Location Data:</h1>
        <p>Longitude: {this.state.longitude}</p>
        <p>Latitude: {this.state.latitude}</p>
        {
          this.state.latitude && this.state.longitude ? 
          <img src={`https://maps.googleapis.com/maps/api/staticmap?center=${this.state.latitude},${this.state.longitude}&zoom=14&size=400x300&sensor=false&markers=color:red%7c${this.state.latitude},${this.state.longitude}&key=${apiKey}`} alt='map' />
  : null
        }
      </div>
    );
  }
}

export default App;
