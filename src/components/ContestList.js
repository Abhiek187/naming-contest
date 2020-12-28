import PropTypes from "prop-types";
import React from "react";
import ContestPreview from "./ContestPreview";

const ContestList = ({ contests, onContestClick }) => (
	<div className="ContestList">
		{Object.keys(contests).map(contestId =>
			<ContestPreview
				key={contestId}
				onClick={onContestClick}
				{...contests[contestId]} />
		)}
	</div>
);

ContestList.propTypes = {
	contests: PropTypes.object.isRequired,
	onContestClick: PropTypes.func.isRequired
};

export default ContestList;
