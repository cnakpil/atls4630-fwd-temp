import React from "react";

export default class Title extends React.Component {
    constructor(props) {
        super(); // call class functions from the inherited class --> react.component)
        this.name = props.name;
    }

    render() {
        const styles = {
            fontSize: '2em',
            color: 'darkblue'
        };
        return (
            <h1 className="test-heading" style={styles}> Hello {this.name}!</h1 >
        );
    }
}