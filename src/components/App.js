import PropTypes from "prop-types";
import React from "react";
import Header from "./Header";
import Contest from "./Contest";
import ContestList from "./ContestList"
import * as api from "../api";

const pushState = (obj, url) =>
	window.history.pushState(obj, "", url);

const onPopState = handler => {
	window.onpopstate = handler;
};

class App extends React.Component {
	static propTypes = {
		initialData: PropTypes.object.isRequired
	};

	state = this.props.initialData; // contains a contest property

	componentDidMount() {
		// timers, listeners, ajax...
		onPopState(event => {
			// Called when the back button is pressed
			this.setState({
				// Get the ID gotten from going back a URL
				currentContestId: (event.state || {}).currentContestId
			});
		});
	}

	componentWillUnmount() {
		// clean timers, listeners
		onPopState(null); // unregister the event
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
				currentContestId: contest._id,
				// Cache the fetched contest information into the state
				contests: {
					...this.state.contests,
					[contest._id]: contest
				}
			});
		});
	}

	// Get all the contests
	fetchContestList = () => {
		pushState(
			{ currentContestId: null },
			"/"
		);

		// Look up the contest
		api.fetchContestList().then(contests => {
			this.setState({
				currentContestId: null,
				contests
			});
		});
	}

	fetchNames = nameIds => {
		if (nameIds.length === 0) {
			return;
		}

		api.fetchNames(nameIds).then(names => {
			this.setState({ names });
		}).catch(console.error);
	};

	currentContest() {
		return this.state.contests[this.state.currentContestId];
	}

	pageHeader() {
		if (this.state.currentContestId) {
			return this.currentContest().contestName;
		} else {
			return "Naming Contests";
		}
	}

	lookupName = nameId => {
		if (!this.state.names || !this.state.names[nameId]) {
			return {
				name: "..." // placeholder while loading the names
			};
		} else {
			return this.state.names[nameId];
		}
	};

	currentContent() {
		if (this.state.currentContestId) {
			return <Contest
					contestListClick={this.fetchContestList}
					fetchNames={this.fetchNames}
					lookupName={this.lookupName}
					{...this.currentContest()} />;
		} else {
			return <ContestList
					contests={this.state.contests}
					onContestClick={this.fetchContest} />;
		}
	}

	render() {
		// JSX code
		return (
			<div className="App">
				<Header message={this.pageHeader()} />
				{this.currentContent()}
			</div>
		);
	}
};

export default App;
