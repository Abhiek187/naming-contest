import PropTypes from "prop-types";
import React from "react";
import ReactDOM from "react-dom";

const App = (props) => {
	// JSX code
	return (
		<h2 className="text-center">
			{props.headerMessage}
		</h2>
	);
};

App.propTypes = {
	headerMessage: PropTypes.string
};

App.defaultProps = {
	headerMessage: "Hello!!"
};

ReactDOM.render(
	<App />,
	document.getElementById("root")
);
