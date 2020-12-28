import axios from "axios";
import React from "react";
import Header from "./Header";
import ContestPreview from "./ContestPreview";

class App extends React.Component {
	state = {
		pageHeader: "Naming Contests",
		contests: []
	};

	componentDidMount() {
		// timers, listeners, ajax...
		axios.get("/api/contests")
		.then(resp => {
			this.setState({
				contests: resp.data.contests
			});
		})
		.catch(console.error);
	}

	componentWillUnmount() {
		// clean timers, listeners
	}

	render() {
		// JSX code
		return (
			<div className="App">
				<Header message={this.state.pageHeader} />
				<div>
					{this.state.contests.map(contest =>
						<ContestPreview key={contest.id} {...contest} />
					)}
				</div>
			</div>
		);
	}
};

export default App;
