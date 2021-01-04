import PropTypes from "prop-types";
import React, { useEffect, useReducer } from "react";
import Header from "./Header";
import Contest from "./Contest";
import ContestList from "./ContestList"
import * as api from "../api";

const pushState = (obj, url) =>
	window.history.pushState(obj, "", url);

const onPopState = handler => {
	window.onpopstate = handler;
};

const App = ({ initialData }) => {
	// Initialize the state to be the initialData (with the contest property)
	const [state, setState] = useReducer(
		(state, newState) => ({ ...state, ...newState }),
		initialData // useReducer() allows multiple states to be altered at once
	);

	useEffect(() => {
		// timers, listeners, ajax...
		onPopState(event => {
			// Called when the back button is pressed
			// Get the ID gotten from going back a URL
			const contestId = (event.state || {}).currentContestId;

			// Fetch the details about a contest if going back to it
			if (contestId) {
				api.fetchContest(contestId).then(contest => {
					setState({
						currentContestId: contest._id,
						// Cache the fetched contest information into the state
						contests: {
							...state.contests,
							[contest._id]: contest
						}
					});
				});
			} else {
				setState({
					currentContestId: contestId
				});
			}
		});

		return () => {
			// clean timers, listeners
			onPopState(null); // unregister the event
		};
	}, []); // no componentDidUpdate()

	// Go to the page with the selected contest ID
	const fetchContest = contestId => {
		pushState(
			{ currentContestId: contestId },
			`/contest/${contestId}`
		);

		// Look up the contest
		api.fetchContest(contestId).then(contest => {
			setState({
				currentContestId: contest._id,
				// Cache the fetched contest information into the state
				contests: {
					...state.contests,
					[contest._id]: contest
				}
			});
		});
	};

	// Get all the contests
	const fetchContestList = () => {
		pushState(
			{ currentContestId: null },
			"/"
		);

		// Look up the contest
		api.fetchContestList().then(contests => {
			setState({
				currentContestId: null,
				contests
			});
		});
	};

	const fetchNames = nameIds => {
		if (nameIds.length === 0) {
			return;
		}

		api.fetchNames(nameIds).then(names => {
			setState({ names });
		}).catch(console.error);
	};

	// What to display at the top
	const pageHeader = () => {
		if (state.currentContestId) {
			return state.contests[state.currentContestId].contestName;
		} else {
			return "Naming Contests"; // default header in the home page
		}
	};

	const lookupName = nameId => {
		if (!state.names || !state.names[nameId]) {
			return {
				name: "..." // placeholder while loading the names
			};
		} else {
			return state.names[nameId];
		}
	};

	const addName = (newName, contestId) =>
		// Return the state of the promise in case the server is down
		api.addName(newName, contestId).then(resp =>
			setState({
				contests: {
					...state.contests,
					[resp.updatedContest._id]: resp.updatedContest
				},
				names: {
					...state.names,
					[resp.newName._id]: resp.newName
				}
			})
		).catch(error => {
			throw error;
		});

	// Either display all contests or the details of one contest
	const currentContent = () => {
		if (state.currentContestId) {
			return <Contest
					contestListClick={fetchContestList}
					fetchNames={fetchNames}
					lookupName={lookupName}
					addName={addName}
					{...state.contests[state.currentContestId]} />;
		} else {
			return <ContestList
					contests={state.contests}
					onContestClick={fetchContest} />;
		}
	};

	// JSX code
	return (
		<div className="App">
			<Header message={pageHeader()} />
			{currentContent()}
		</div>
	);
};

App.propTypes = {
	initialData: PropTypes.object.isRequired
};

export default App;
