// Entry point for the client (configured in webpack.config.js)
import React from "react";
import ReactDOM from "react-dom";

import App from "./components/App";

// Preserve the server-side render and only attach event handlers
ReactDOM.hydrate(
	<App initialData={window.initialData} />,
	document.getElementById("root")
);
