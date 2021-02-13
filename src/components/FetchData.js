import React, { Component } from 'react'

class FetchData extends Component {

    constructor(){
        super();

    }

    componentDidMount(){
        fetch('https://jsonplaceholder.typicode.com/posts').then(response => response.json()).then(data => {
            console.log(data);
        })
    }

    render() {
        return (
            <div>
                test
            </div>
        )
    }
}

export default FetchData;
