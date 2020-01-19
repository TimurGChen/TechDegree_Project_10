import React from 'react';
import axios from 'axios';

export default class Test extends React.Component {
    state = {
        data: null,
    }

    componentDidMount() {
        axios.get('http://localhost:5000/api/courses/')
            .then(response => {
                this.setState({ data: response.data });
            })
            .catch(err => {
                console.error(`Error parsing and fetching data: ${err}`);
            });
    }

    render() {
        let data = this.state.data;
        console.log(data);
        return (
            <h2>
                Render Success!
            </h2>
        );
    }
}