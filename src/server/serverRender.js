// Fetch the data from the API
import axios from "axios";
import config from "./config";
import React from "react";
import ReactDOMServer from "react-dom/server";

import App from "../components/App";

const getApiUrl = contestId => {
	if (contestId) {
		return `${config.serverUrl}/api/contests/${contestId}`;
	} else {
		return `${config.serverUrl}/api/contests`;
	}
};

const getInitialData = (contestId, apiData) => {
	if (contestId) {
		return {
			currentContestId: apiData._id,
			// Only give data for one contest
			contests: {
				[apiData._id]: apiData
			}
		};
	} else {
		return {
			contests: apiData.contests
		};
	}
};

// The default function when importing serverRender
const serverRender = contestId =>
	axios.get(getApiUrl(contestId))
		.then(resp => {
			const initialData = getInitialData(contestId, resp.data);

			return {
				initialMarkup: ReactDOMServer.renderToString(
					<App initialData={initialData} />
				),
				initialData
			};
		})
		.catch(console.error);

export default serverRender;
