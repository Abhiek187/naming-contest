import PropTypes from "prop-types";
import React from "react";
import ReactDOM from "react-dom";

import App from "./components/App";

// Preserve the server-side render and only attach event handlers
ReactDOM.hydrate(
	<App initialData={window.initialData} />,
	document.getElementById("root")
);
