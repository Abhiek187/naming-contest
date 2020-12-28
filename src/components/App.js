import React from "react";
import Header from "./Header";
import Contest from "./Contest";
import ContestList from "./ContestList"
import * as api from "../api";

const pushState = (obj, url) =>
	window.history.pushState(obj, "", url);

class App extends React.Component {
	state = {
		pageHeader: "Naming Contests",
		contests: this.props.initialContests
	};

	componentDidMount() {
		// timers, listeners, ajax...
	}

	componentWillUnmount() {
		// clean timers, listeners
	}

	// Go to the page with the selected contest ID
	fetchContest = contestId => {
		pushState(
			{ currentContestId: contestId },
			`/contest/${contestId}`
		);

		// Look up the contest
		api.fetchContest(contestId).then(contest => {
			this.setState({
				pageHeader: contest.contestName,
				currentContestId: contest.id,
				// Cache the fetched contest information into the state
				contests: {
					...this.state.contests,
					[contest.id]: contest
				}
			});
		});
	}

	currentContent() {
		if (this.state.currentContestId !== undefined) {
			return <Contest {...this.state.contests[this.state.currentContestId]} />
		} else {
			return <ContestList
					contests={this.state.contests}
					onContestClick={this.fetchContest} />
		}
	}

	render() {
		// JSX code
		return (
			<div className="App">
				<Header message={this.state.pageHeader} />
				{this.currentContent()}
			</div>
		);
	}
};

export default App;
