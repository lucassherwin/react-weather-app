import React, {Component} from 'react';
import './App.css';
import CurrentDay from './components/CurrentDay.js';

class App extends Component {
  state = {
    latitude: null,
    longitude: null,
    userAddress: null,
    userCityKey: null
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
    this.getUserAddress();
  }

  getUserAddress = () => {
    let GOOGLEapiKey = process.env.REACT_APP_GOOGLE_API_KEY;
    fetch(`https://maps.googleapis.com/maps/api/geocode/json?latlng=${this.state.latitude},${this.state.longitude}&key=${GOOGLEapiKey}`)
    .then(resp => resp.json())
    .then(data => {
      this.setState({userAddress: data.results[0].formatted_address})
      //address isnt exactly right this might just be for my house though
      // console.log(data)
      this.getUserCityID(this.state.userAddress)
    })
  }

  //take user address as parameter
  getUserCityID = (address) => {
    //weather api key
    let WEATHERapiKey = process.env.REACT_APP_WEATHER_API_KEY;
    // console.log(WEATHERapiKey)
    //get city from address
    let city = address.split(',');
    console.log(city[1].replace(/\s+/g, ''));
    city = city[1].replace(/\s+/g, '')
    //make api call with city
    fetch(`http://dataservice.accuweather.com/locations/v1/cities/search?apikey=${WEATHERapiKey}&q=${city}`)
    .then(resp => resp.json())
    .then(data => {
      this.setState({userCityKey: data[0]['Key']})
    })
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
    let GOOGLEapiKey = process.env.REACT_APP_GOOGLE_API_KEY;
    return (
      <div className="App">
        {/* <CurrentDay latitude={this.state.latitude} longitude={this.state.longitude} /> */}
        <h1>Location Data:</h1>
        <p>Longitude: {this.state.longitude}</p>
        <p>Latitude: {this.state.latitude}</p>
        <p>User Address: {this.state.userAddress}</p>
        {
          this.state.latitude && this.state.longitude ? 
          <img src={`https://maps.googleapis.com/maps/api/staticmap?center=${this.state.latitude},${this.state.longitude}&zoom=14&size=400x300&sensor=false&markers=color:red%7c${this.state.latitude},${this.state.longitude}&key=${GOOGLEapiKey}`} alt='map' />
  : null
        }
        {
          this.state.userCityKey !== null ? <CurrentDay cityKey={this.state.userCityKey} /> : null
        }
      </div>
    );
  }
}

export default App;
