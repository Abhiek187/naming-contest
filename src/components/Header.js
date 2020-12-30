import PropTypes from "prop-types";
import React from "react";

const Header = ({ message }) => {
	return (
		<h2 className="Header text-center mt-2">
			{message}
		</h2>
	);
};

Header.propTypes = {
	message: PropTypes.string.isRequired
};

export default Header;
