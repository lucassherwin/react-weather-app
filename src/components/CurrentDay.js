import React, { Component } from 'react'
import { geolocated } from "react-geolocated";

export class CurrentDay extends Component {
    state = {
        currentWeatherType: null,
        currentTempF: null,
        currentTempC: null,
        isRaining: null, //this will be a bool
        seeMoreLink: null,
        tempHigh: null, //high for the day
        tempLow: null, //low for the day
        humidity: null,
        uvIndex: null,
        uvIndexText: null,
        windDirection: null,
        windSpeedMPH: null,
        windSpeedKMPH: null,
        windChillTempF: null,
        windChillTempC: null
    }
    componentDidMount()
    {
        // console.log('in currentDay', this.props)
        let WEATHERapiKey = process.env.REACT_APP_WEATHER_API_KEY;
        fetch(`http://dataservice.accuweather.com/currentconditions/v1/${this.props.cityKey}?apikey=${WEATHERapiKey}&details=true`)
        .then(resp => resp.json())
        .then(data => this.setState({
            currentWeatherType: data[0]['WeatherText'],
            currentTempF: data[0]['Temperature']['Imperial']['Value'],
            currentTempC: data[0]['Temperature']['Metric']['Value'],
            isRaining: data[0]['HasPrecipitation'],
            seeMoreLink: data[0]['Link'],
            
        }))
    }

    render() {
        return (
            <div>
                <h1>current day</h1>
                <p>The Current Weather Is: {this.state.currentWeatherType}</p>
            </div>
        )
    }
}

export default CurrentDay

//this will get the current days forecast based on the users location

//1. get user location
//2. make api call with that location
//3. display relevant weather data