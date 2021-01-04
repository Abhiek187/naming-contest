import PropTypes from "prop-types";
import React from "react";

const ContestPreview = ({ _id, onClick, categoryName, contestName }) => {
	const handleClick = () => {
		onClick(_id);
	};

	return (
		<div className="link ContestPreview" onClick={handleClick}>
			<div className="category-name">
				{categoryName}
			</div>
			<div className="contest-name">
				{contestName}
			</div>
		</div>
	);
};

ContestPreview.propTypes = {
	_id: PropTypes.string.isRequired,
	onClick: PropTypes.func.isRequired,
	categoryName: PropTypes.string.isRequired,
	contestName: PropTypes.string.isRequired
};

export default ContestPreview;
