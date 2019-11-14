import React, { Component } from 'react';

import App from './App';

class Home extends Component {

	render() {
		return (
			<div>
				<p1> Welcome {this.props.username}! </p1>
				<p1> Data: {this.props.data.toString()} </p1>
			</div>
		);
	}
}

export default Home;