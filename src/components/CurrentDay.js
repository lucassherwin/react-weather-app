import React, { Component } from 'react'

export class CurrentDay extends Component {
    // state = {
    //     currentWeatherType: null,
    //     currentTempF: null,
    //     currentTempC: null,
    //     isRaining: null, //this will be a bool
    //     seeMoreLink: null,
    //     tempHighF: null, //high for the day
    //     tempHighC: null, 
    //     tempLowF: null, //low for the day
    //     tempLowC: null,
    //     humidity: null,
    //     uvIndex: null,
    //     uvIndexText: null,
    //     windDirection: null,
    //     windSpeedMPH: null,
    //     windSpeedKMPH: null,
    //     windChillTempF: null,
    //     windChillTempC: null
    // }

    componentDidMount()
    {
        // console.log('in currentDay', this.props)
        // let WEATHERapiKey = process.env.REACT_APP_WEATHER_API_KEY;
        // fetch(`http://dataservice.accuweather.com/currentconditions/v1/${this.props.cityKey}?apikey=${WEATHERapiKey}&details=true`)
        // .then(resp => resp.json())
        // .then(data => this.setState({
        //     currentWeatherType: data[0]['WeatherText'],
        //     currentTempF: data[0]['Temperature']['Imperial']['Value'],
        //     currentTempC: data[0]['Temperature']['Metric']['Value'],
        //     isRaining: data[0]['HasPrecipitation'],
        //     seeMoreLink: data[0]['Link'],
        //     tempHighF: data[0]['TemperatureSummary']['Past24HourRange']['Maximum']['Imperial']['Value'],
        //     tempHighC: data[0]['TemperatureSummary']['Past24HourRange']['Maximum']['Metric']['Value'],
        //     tempLowF: data[0]['TemperatureSummary']['Past24HourRange']['Minimum']['Imperial']['Value'],
        //     tempLowC: data[0]['TemperatureSummary']['Past24HourRange']['Minimum']['Metric']['Value'],
        //     humidity: data[0]['RelativeHumidity'],
        //     uvIndex: data[0]['UVIndex'],
        //     uvIndexText: data[0]['UVIndexText'],
        //     windDirection: data[0]['Wind']['Direction']['Localized'],
        //     windSpeedMPH: data[0]['Wind']['Speed']['Imperial']['Value'],
        //     windSpeedKMPH: data[0]['Wind']['Speed']['Metric']['Value'],
        //     windChillTempC: data[0]['WindChillTemperature']['Metric']['Value'],
        //     windChillTempF: data[0]['WindChillTemperature']['Imperial']['Value']
        // }))
        this.props.getLocationWeather(this.props.cityKey);
    }

    render() {
        return (
            <div>
                <h1>current day</h1>
                <p>The Current Weather Is: {this.props.currentWeatherType}</p>
                <p>currentTempF: {this.props.currentTempF}</p>
                <p>currentTempC: {this.props.currentTempC}</p>
                <p>isRaining: {this.props.isRaining ? 'Currently Raining' : 'Not Currently Raining'}</p>
                <p>seeMoreLink: {this.props.seeMoreLink}</p>
                <p>tempHighF: {this.props.tempHighF}</p>
                <p>tempHighC: {this.props.tempHighC}</p>
                <p>tempLowF: {this.props.tempLowF}</p>
                <p>tempLowC: {this.props.tempLowC}</p>
                <p>humidity: {this.props.humidity}%</p>
                <p>uvIndex: {this.props.uvIndex}</p>
                <p>uvIndexText: {this.props.uvIndexText}</p>
                <p>windDirection: {this.props.windDirection}</p>   
                <p>windSpeedMPH: {this.props.windSpeedMPH}</p>
                <p>windSpeedKMPH: {this.props.windSpeedKMPH}</p>
                <p>windChillTempF: {this.props.windChillTempF}</p>
                <p>windChillTempC: {this.props.windChillTempC}</p>
            </div>
        )
    }
}

export default CurrentDay

//this will get the current days forecast based on the users location

//1. get user location
//2. make api call with that location
//3. display relevant weather data