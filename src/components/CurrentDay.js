import React, { Component } from 'react'
import { geolocated } from "react-geolocated";

export class CurrentDay extends Component {
    render() {
        return (
            <div>
                <h1>current day</h1>
            </div>
        )
    }
}

export default CurrentDay

//this will get the current days forecast based on the users location

//1. get user location
//2. make api call with that location
//3. display relevant weather data