import React, { Component } from 'react'; 
import { Input } from 'semantic-ui-react';
import { Button } from 'semantic-ui-react';

export class Search extends Component {
    state = {
        search: ''
    }

    handleSearch = (event) => {
        console.log('searching: ', event.target.value);

        this.setState({search: event.target.value})
    }

    handleSearchButton = (event) => {
        let WEATHERapiKey = process.env.REACT_APP_WEATHER_API_KEY;
        console.log('clicked');

        this.props.searchLocation(this.state.search)
    }

    render() {
        return (
            <div>
                <Input icon='search' placeholder='Search...' onChange={this.handleSearch}/>
                <Button content='Search' class='ui right floated primary button' onClick={this.handleSearchButton} />
            </div>
        )
    }
}

export default Search
