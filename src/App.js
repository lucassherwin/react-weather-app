import React, {Component} from 'react';
import './App.css';
import CurrentDay from './components/CurrentDay.js';
import Search from './components/Search.js';

class App extends Component {
  state = {
    latitude: null,
    longitude: null,
    userAddress: null,
    userCityKey: null,
    currentWeatherType: null,
    currentTempF: null,
    currentTempC: null,
    isRaining: null, //this will be a bool
    seeMoreLink: null,
    tempHighF: null, //high for the day
    tempHighC: null, 
    tempLowF: null, //low for the day
    tempLowC: null,
    humidity: null,
    uvIndex: null,
    uvIndexText: null,
    windDirection: null,
    windSpeedMPH: null,
    windSpeedKMPH: null,
    windChillTempF: null,
    windChillTempC: null
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
      // console.log(data)
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

  searchLocation = (searchCity) => {
    console.log(searchCity);
    searchCity = searchCity.replace(/ /g,"%20");
    let WEATHERapiKey = process.env.REACT_APP_WEATHER_API_KEY;

    fetch(`http://dataservice.accuweather.com/locations/v1/cities/search?apikey=${WEATHERapiKey}&q=${searchCity}`)
    .then(resp => resp.json())
    .then(data => {
      this.setState({userCityKey: data[0]['Key']})
      // console.log(data)
      this.getLocationWeather()
    })
  }

  getLocationWeather = () => {
    console.log('getting location weather');
    let WEATHERapiKey = process.env.REACT_APP_WEATHER_API_KEY;
    fetch(`http://dataservice.accuweather.com/currentconditions/v1/${this.state.userCityKey}?apikey=${WEATHERapiKey}&details=true`)
    .then(resp => resp.json())
    .then(data => 
      // console.log(data[0]))
      this.setState({
      currentWeatherType: data[0]['WeatherText'],
      currentTempF: data[0]['Temperature']['Imperial']['Value'],
      currentTempC: data[0]['Temperature']['Metric']['Value'],
      isRaining: data[0]['HasPrecipitation'],
      seeMoreLink: data[0]['Link'],
      tempHighF: data[0]['TemperatureSummary']['Past24HourRange']['Maximum']['Imperial']['Value'],
      tempHighC: data[0]['TemperatureSummary']['Past24HourRange']['Maximum']['Metric']['Value'],
      tempLowF: data[0]['TemperatureSummary']['Past24HourRange']['Minimum']['Imperial']['Value'],
      tempLowC: data[0]['TemperatureSummary']['Past24HourRange']['Minimum']['Metric']['Value'],
      humidity: data[0]['RelativeHumidity'],
      uvIndex: data[0]['UVIndex'],
      uvIndexText: data[0]['UVIndexText'],
      windDirection: data[0]['Wind']['Direction']['Localized'],
      windSpeedMPH: data[0]['Wind']['Speed']['Imperial']['Value'],
      windSpeedKMPH: data[0]['Wind']['Speed']['Metric']['Value'],
      windChillTempC: data[0]['WindChillTemperature']['Metric']['Value'],
      windChillTempF: data[0]['WindChillTemperature']['Imperial']['Value']
    }))
  }

  componentDidMount(){
    this.getLocation();
  }

  render()
  {
    let GOOGLEapiKey = process.env.REACT_APP_GOOGLE_API_KEY;
    return (
      <div className="App">
      <Search searchLocation={this.searchLocation}/>
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
          this.state.userCityKey !== null ? <CurrentDay getLocationWeather={this.getLocationWeather}
          currentWeatherType={this.state.currentWeatherType} currentTempF={this.state.currentTempF} currentTempC={this.state.currentTempC} isRaining={this.state.isRaining} seeMoreLink={this.state.seeMoreLink}
          tempHighC={this.state.tempHighC} tempHighF={this.state.tempHighF} tempLowC={this.state.tempLowC} tempLowF={this.state.tempLowF} humidity={this.state.humidity} uvIndex={this.state.uvIndex}
          uvIndexText={this.state.uvIndexText} windDirection={this.state.windDirection} windSpeedKMPH={this.state.windSpeedKMPH} windSpeedMPH={this.state.windSpeedMPH} windChillTempC={this.state.windChillTempC}
          windChillTempF={this.state.windChillTempF}
          /> : null
        }
      </div>
    );
  }
}

export default App;
